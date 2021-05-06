declare module 'inquirer-file-tree-selection-prompt' {
  function FileTreeSelectionPrompt (
    question: any,
    readLine: Interface,
    answers: Answers
  ): PromptConstructor;
  export = FileTreeSelectionPrompt;
}
