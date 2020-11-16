"use strict";

// Schema For Validation
const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true,
};
const issueFieldType = {
  status: "required",
  owner: "required",
  effort: "optional",
  created: "required",
  completionDate: "optional",
  title: "required",
};

// Validation function
function validateIssue(issue) {
  for (const field in issueFieldType) {
    if (issueFieldType.hasOwnProperty(field)) {
      const type = issueFieldType[field];
      if (!type) {
        delete issue[field];
      } else if (type === "required" && !issue[field]) {
        return `${field} is required`;
      }
    }
  }

  if (!validIssueStatus[issue.status]) {
    return `${issue.status} is not a valid status`;
  }
}

module.exports = { validateIssue };
