const contentNode = document.getElementById("root");

// IssueFilter Component
class IssueFilter extends React.Component {
  render() {
    return <div>This is a placeholder for the Issue Filter.</div>;
  }
}

// IssueTable Component
class IssueRow extends React.Component {
  render() {
    const borderedStyle = { border: "1px solid silver", padding: 4 };
    return (
      <tr>
        <td style={borderedStyle}>{this.props.issue_id}</td>
        <td style={borderedStyle}>{this.props.issue_title}</td>
      </tr>
    );
  }
}

class IssueTable extends React.Component {
  render() {
    const borderedStyle = { border: "1px solid silver", padding: 6 };

    return (
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={borderedStyle}>Id</th>
            <th style={borderedStyle}>Title</th>
          </tr>
        </thead>
        <tbody>
          <IssueRow
            issue_id={1}
            issue_title="Error in console when clicking Add"
          />
          <IssueRow issue_id={2} issue_title="Missing bottom border on panel" />
        </tbody>
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
        <IssueTable />
        <hr />
        <IssueAdd />
      </div>
    );
  }
}

ReactDOM.render(<IssueList />, contentNode);
