export const IssueType = {
  TASK: 'task',
  BUG: 'bug',
  STORY: 'story',
};

export const IssueFilter = {
  DONE: 'done',
  INPROGRESS: 'inprogress',
  ALL : 'all'
};

export const IssueStatus = {
  BACKLOG: 'backlog',
  INPROGRESS: 'inprogress',
  DONE: 'done',
};

export const IssueAll = {
  all: 'all',

};

export const IssuePriority = {
  HIGHEST: '5',
  HIGH: '4',
  MEDIUM: '3',
  LOW: '2',
  LOWEST: '1',
};


export const IssueFilterCopy = {
  [IssueFilter.DONE] : 'done',
  [IssueFilter.INPROGRESS]: 'inprogress',
  [IssueFilter.ALL]: 'all',
};

export const IssueTypeCopy = {
  [IssueType.TASK]: 'Task',
  [IssueType.BUG]: 'Bug',
  [IssueType.STORY]: 'Story',
};

export const IssueStatusCopy = {
  [IssueStatus.BACKLOG]: 'Backlog',
  [IssueStatus.INPROGRESS]: 'In progress',
  [IssueStatus.DONE]: 'Done',
};

export const IssuePriorityCopy = {
  [IssuePriority.HIGHEST]: 'Highest',
  [IssuePriority.HIGH]: 'High',
  [IssuePriority.MEDIUM]: 'Medium',
  [IssuePriority.LOW]: 'Low',
  [IssuePriority.LOWEST]: 'Lowest',
};
