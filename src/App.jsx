const contentNode = document.getElementById("root");

// IssueFilter Component
class IssueFilter extends React.Component {
  render() {
    return <div>This is a placeholder for the Issue Filter.</div>;
  }
}

// IssueTable Component
const IssueRow = (props) => {
  const { issue } = props;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.completionDate ? issue.completionDate.toDateString() : ""}</td>
      <td>{issue.title}</td>
    </tr>
  );
};

function IssueTable(props) {
  const IssueRows = props.issues.map((issue) => (
    <IssueRow key={issue.id} issue={issue} />
  ));

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Created</th>
          <th>Effort</th>
          <th>Completion Date</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>{IssueRows}</tbody>
    </table>
  );
}

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: "New",
      created: new Date(),
    });

    form.owner.value = "";
    form.title.value = "";
  }

  render() {
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit}>
          <input type="text" name="owner" placeholder="Owner" />
          <input type="text" name="title" placeholder="Title" />
          <button>Add</button>
        </form>
      </div>
    );
  }
}

// IssueList and Parent Component
class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };

    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadDate();
  }

  loadDate() {
    fetch("/api/issues")
      .then((response) => response.json())
      .then((data) => {
        data.records.forEach((issue) => {
          issue.created = new Date(issue.created);
          issue.completionDate =
            issue.completionDate && new Date(issue.completionDate);
        });
        this.setState({ issues: data.records });
      })
      .catch((err) => console.log(err));
  }

  createIssue(newIssue) {
    fetch("/api/issues", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newIssue),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((updatedIssue) => {
            updatedIssue.created = new Date(updatedIssue.created);
            updatedIssue.completionDate =
              updatedIssue.completionDate &&
              new Date(updatedIssue.completionDate);

            const newIssues = this.state.issues.concat(updatedIssue);
            this.setState({ issues: newIssues });
          });
        } else {
          response.json().then((err) => {
            alert("Failed to add issue:" + err.message);
          });
        }
      })
      .catch((err) => alert("Error in sending data to server: " + err.message));
  }

  render() {
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={this.state.issues} />
        <hr />
        <IssueAdd createIssue={this.createIssue} />
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode);
