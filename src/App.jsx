const contentNode = document.getElementById("root");

// Data
const issues = [
  {
    id: 1,
    status: "Open",
    owner: "Ravan",
    created: new Date("2016-08-15"),
    effort: 5,
    completionDate: undefined,
    title: "Error in console when clicking add",
  },
  {
    id: 2,
    status: "Assigned",
    owner: "Eddie",
    created: new Date("2016-08-16"),
    effort: 14,
    completionDate: new Date("2016-08-30"),
    title: "Missing bottom border on panel",
  },
];

// IssueFilter Component
class IssueFilter extends React.Component {
  render() {
    return <div>This is a placeholder for the Issue Filter.</div>;
  }
}

// IssueTable Component
class IssueRow extends React.Component {
  render() {
    const { issue } = this.props;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>
          {issue.completionDate ? issue.completionDate.toDateString() : ""}
        </td>
        <td>{issue.title}</td>
      </tr>
    );
  }
}

class IssueTable extends React.Component {
  render() {
    const borderedStyle = { border: "1px solid silver", padding: 6 };
    const IssueRows = this.props.issues.map((issue) => (
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
}

class IssueAdd extends React.Component {
  render() {
    return <div>This is a placeholder for an Issue Add entry form.</div>;
  }
}

// IssueList and Parent Component
class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: issues };

    setTimeout(this.createTestIssue.bind(this), 2000);
  }

  createIssue(newIssue) {
    // make a copy of the issues state
    const newIssues = this.state.issues.slice();

    // newIssue is an object
    newIssue.id = this.state.issues.length + 1;

    // pushing the object into the copy of issues state
    newIssues.push(newIssue);
  }

  createTestIssue() {
    this.createIssue({
      status: "New",
      owner: "Pieta",
      created: new Date(),
      title: "Completion date should be optional",
    });
  }

  render() {
    return (
      <div>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable issues={issues} />
        <hr />
        <IssueAdd />
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode);
