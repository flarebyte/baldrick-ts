interface ProjectKind {
  name: string;
  description: string;
  flags: string[];
}

interface Project {
  name: string;
  kind: ProjectKind;
}
