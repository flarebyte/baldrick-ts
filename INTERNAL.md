# Internal

> Overview of the code base of baldrick-ts

This document has been generated automatically by
[baldrick-doc-ts](https://github.com/flarebyte/baldrick-doc-ts)

## Diagram of the dependencies

```mermaid
classDiagram
class `barrel.ts`
class `client.ts`{
  +runClient()
}
class `commanding-action.ts`{
  +cmdGenerateAction()
}
class `commanding-data.ts`
class `commanding-helper.ts`{
  - capitalize()
  - decapitalize()
  +toCamelCase()
  +toCommanderOption()
}
class `commanding.ts`
class `commit-message.ts`{
  +commitMessage()
}
class `conf-editor-config.ts`
class `conf-git-ignore.ts`
class `conf-prettier.ts`
class `conf-tsconfig.ts`
class `conf-vscode-snippet.ts`{
  +vsCodeSnippets()
}
class `conf-workflow.ts`{
  +defaultGithubWorkflow()
}
class `feature-helper.ts`{
  - isFeature()
  - toFeature()
  +toFeatures()
}
class `index.ts`
class `io-sfx.ts`{
  +toJsonString()
  +toYamlString()
  - readCustomizedPackageJson()
  - writePackageJson()
  - readReadme()
  - writeReadme()
  - readTechnicalDesign()
  - writeTechnicalDesign()
  - writeCodeOfConducts()
  - writeContributing()
  - writeMaintenance()
  - writePrettierConfig()
  - writeGitIgnore()
  - writeEditorConfig()
  - writeTsConfig()
  - writeLicense()
  - createGithubWorkflowDir()
  - writeWorkflowConfig()
  - writePullRequestMd()
  - writeFeatureRequestYaml()
  - writeBugReportYaml()
  - createVisualCodeDir()
  - writeVsCodeSnippets()
  - createSourceDir()
  - appendCommitMessage()
  - writeZshAlias()
  - writeCommandHelp()
  - writeGlossary()
  +updateAll()
}
class `markdown-code-of-conduct.ts`{
  +codeOfConductMd()
}
class `markdown-contributing.ts`
class `markdown-glossary.ts`{
  - glossaryDefToString()
  +glossaryMd()
}
class `markdown-license.ts`{
  - copyrightRangeIfAny()
  - licenseMIT()
  +licenseMd()
}
class `markdown-maintenance.ts`{
  - runBaldrick()
  - lintCmd()
  - lintFixCmd()
  - lintCICmd()
  - testCmd()
  - testFixCmd()
  - testCovCmd()
  - testCICmd()
  - mdCmd()
  - mdFixCmd()
  - releaseCheckCmd()
  - releaseCiCmd()
  - normCmd()
  - devCommands()
  - maintenanceOverview()
  +maintenanceMd()
  - removeNulls()
  +getNpmScripts()
  +getZshAliases()
  +getCommandHelp()
}
class `markdown-pull-request.ts`
class `markdown-readme.ts`{
  - capitalize()
  - libBadges()
  - keepSections()
  - docAndLinks()
  - installSection()
  +toReadmeMd()
}
class `markdown-technical-design.ts`{
  - keepSections()
  +toTechnicalDesignMd()
}
class `markdown.ts`{
  - getMainSection()
  - discardHeader2()
  - linesToSection()
  - detectSecondaryHeader()
  - getSecondarySections()
  - extractBadge()
  - countBadgeParts()
  - foldBadgePart()
  - locateBadgeZone()
  - isWithinBadgeZone()
  - findBadges()
  - keepHeaderBody()
  +parseMarkdown()
  - badgeToString()
  - sectionToString()
  +markdownToString()
  - installationTypeToText()
  - packageCmdToMd()
  - exampleToMd()
  - examplesToMd()
  +commandToMd()
}
class `model.ts`
class `package-copy.ts`{
  +copyScripts()
  +copyDependencies()
  - capitalize()
  +computeCoreProject()
}
class `package-io.ts`{
  - simpleCopyPackageJson()
  +fromString()
  +toString()
}
class `package-stats.ts`{
  +packageToStats()
}
class `package-status.ts`{
  - packConv()
  +convertPackageToStatus()
}
class `package.ts`{
  - trimPackageJson()
  - normalizeOpenSourcePackage()
  - normalizeOtherPackage()
  - normalizePackage()
  +fixAutomatically()
  - keyStatsToTodo()
  - keepNotOk()
  +suggestTasksToDo()
}
class `term-formatter.ts`{
  - simplifyObj()
  - simplifyJson()
  - toJsonish()
  +basicFormatter()
  +errorFormatter()
}
class `utils.ts`{
  - oneOfThree()
  - isAuthor()
  +trimString()
  +trimStringArray()
  +toStringLength()
  +toCountItems()
  +editableToStatus()
  +autoToStatus()
  +editableArrToStatus()
  +authorToStatus()
  +statusToTodo()
  +stringBetween()
  +alwaysObj()
  +findHeader()
  +findQuote()
}
class `version.ts`
class `yaml-bug-report.ts`
class `yaml-feature-request.ts`
class `./index.js`{
  +commanding()
}
class `./io-sfx.js`{
  +updateAll()
}
class `./model.js`{
  +SupportedPackageJsonFieldType()
  +FieldStatus()
  +Author()
  +TermFormatterParams()
  +TermFormatterFormat()
  +ErrTermFormatterParams()
  +minimumNodeVersion()
  +CustomizedPackageJson()
  +Todo()
  +CoreProject()
  +PackageJson()
  +PackageJsonStatusConverter()
  +PackageJsonStatus()
  +PackageKeyStats()
  +Scripts()
  +RunnerContext()
  +GenerateActionOpts()
  +Dependencies()
  +MdSection()
  +MdPackage()
  +MdDocument()
  +MdCommand()
  +InstallationType()
  +Badge()
  +SupportedFeature()
  +GenerateRawOpts()
  +GenerateAction()
  +CmdOption()
  +CmdOptionsGenerator()
}
class `commander`{
  +Command()
  +Option()
}
class `./commanding-data.js`{
  +cmdOptionsGenerator()
}
class `./commanding-helper.js`{
  +toCommanderOption()
}
class `./feature-helper.js`{
  +toFeatures()
}
class `./term-formatter.js`{
  +errorFormatter()
  +basicFormatter()
}
class `./version.js`{
  +version()
}
class `./model`{
  +CoreProject()
  +VsCodeSnippetObj()
  +VsCodeSnippet()
}
class `./commanding-action.js`{
  +cmdGenerateAction()
}
class `./commanding.js`{
  +Commanding()
}
class `node:fs/promises`{
  +mkdir()
  +appendFile()
  +writeFile()
  +readFile()
}
class `yaml`{
  +YAML()
}
class `./markdown-code-of-conduct.js`{
  +codeOfConductMd()
}
class `./markdown-contributing.js`{
  +contributingMd()
}
class `./markdown-readme.js`{
  +toReadmeMd()
}
class `./package.js`{
  +suggestTasksToDo()
  +fixAutomatically()
  +defaultCustomizedPackageJson()
}
class `./package-copy.js`{
  +copyScripts()
  +copyDependencies()
  +computeCoreProject()
}
class `./package-io.js`{
  +toString()
  +fromString()
}
class `./markdown-maintenance.js`{
  +getNpmScripts()
  +maintenanceMd()
  +getZshAliases()
  +getCommandHelp()
}
class `./conf-prettier.js`{
  +defaultPrettier()
}
class `./conf-git-ignore.js`{
  +gitIgnoreConfig()
}
class `./conf-tsconfig.js`{
  +defaultTsConfig()
}
class `./conf-workflow.js`{
  +defaultGithubWorkflow()
}
class `./markdown-pull-request.js`{
  +pullRequestMd()
}
class `./yaml-feature-request.js`{
  +featureRequest()
}
class `./yaml-bug-report.js`{
  +bugReport()
}
class `./conf-editor-config.js`{
  +editorConfig()
}
class `./conf-vscode-snippet.js`{
  +vsCodeSnippets()
}
class `./markdown-license.js`{
  +licenseMd()
}
class `./markdown-technical-design.js`{
  +toTechnicalDesignMd()
}
class `./commit-message.js`{
  +commitMessage()
}
class `./markdown-glossary.js`{
  +glossaryMd()
}
class `markdown-table`{
  +markdownTable()
}
class `./markdown.js`{
  +parseMarkdown()
  +markdownToString()
  +commandToMd()
}
class `./utils.js`{
  +trimStringArray()
  +trimString()
  +statusToTodo()
  +editableToStatus()
  +editableArrToStatus()
  +autoToStatus()
  +authorToStatus()
  +toStringLength()
  +toCountItems()
  +alwaysObj()
  +stringBetween()
  +findQuote()
  +findHeader()
}
class `node:path`{
  +path()
}
class `./package-status.js`{
  +convertPackageToStatus()
}
class `./barrel.js`{
  +isEqual()
}
`client.ts`-->`./index.js`
`commanding-action.ts`-->`./io-sfx.js`
`commanding-action.ts`-->`./model.js`
`commanding-data.ts`-->`./model.js`
`commanding-helper.ts`-->`commander`
`commanding-helper.ts`-->`./model.js`
`commanding.ts`-->`commander`
`commanding.ts`-->`./commanding-data.js`
`commanding.ts`-->`./commanding-helper.js`
`commanding.ts`-->`./feature-helper.js`
`commanding.ts`-->`./model.js`
`commanding.ts`-->`./term-formatter.js`
`commanding.ts`-->`./version.js`
`commit-message.ts`-->`./version.js`
`conf-vscode-snippet.ts`-->`./model`
`conf-workflow.ts`-->`./model.js`
`feature-helper.ts`-->`./model.js`
`index.ts`-->`./commanding-action.js`
`index.ts`-->`./commanding.js`
`io-sfx.ts`-->`node:fs/promises`
`io-sfx.ts`-->`yaml`
`io-sfx.ts`-->`./markdown-code-of-conduct.js`
`io-sfx.ts`-->`./markdown-contributing.js`
`io-sfx.ts`-->`./markdown-readme.js`
`io-sfx.ts`-->`./model.js`
`io-sfx.ts`-->`./package.js`
`io-sfx.ts`-->`./package-copy.js`
`io-sfx.ts`-->`./package-io.js`
`io-sfx.ts`-->`./markdown-maintenance.js`
`io-sfx.ts`-->`./conf-prettier.js`
`io-sfx.ts`-->`./conf-git-ignore.js`
`io-sfx.ts`-->`./conf-tsconfig.js`
`io-sfx.ts`-->`./conf-workflow.js`
`io-sfx.ts`-->`./markdown-pull-request.js`
`io-sfx.ts`-->`./yaml-feature-request.js`
`io-sfx.ts`-->`./yaml-bug-report.js`
`io-sfx.ts`-->`./conf-editor-config.js`
`io-sfx.ts`-->`./conf-vscode-snippet.js`
`io-sfx.ts`-->`./markdown-license.js`
`io-sfx.ts`-->`./markdown-technical-design.js`
`io-sfx.ts`-->`./commit-message.js`
`io-sfx.ts`-->`./markdown-glossary.js`
`markdown-code-of-conduct.ts`-->`./model`
`markdown-contributing.ts`-->`./model.js`
`markdown-license.ts`-->`./model`
`markdown-maintenance.ts`-->`markdown-table`
`markdown-maintenance.ts`-->`./commanding-data.js`
`markdown-maintenance.ts`-->`./markdown.js`
`markdown-maintenance.ts`-->`./model.js`
`markdown-readme.ts`-->`./markdown.js`
`markdown-readme.ts`-->`./model.js`
`markdown-technical-design.ts`-->`./markdown.js`
`markdown-technical-design.ts`-->`./model.js`
`markdown.ts`-->`./model.js`
`markdown.ts`-->`./utils.js`
`package-copy.ts`-->`./model.js`
`package-copy.ts`-->`./utils.js`
`package-copy.ts`-->`node:path`
`package-io.ts`-->`./model.js`
`package-stats.ts`-->`./model.js`
`package-stats.ts`-->`./utils.js`
`package-status.ts`-->`./model.js`
`package-status.ts`-->`./utils.js`
`package.ts`-->`./markdown-maintenance.js`
`package.ts`-->`./model.js`
`package.ts`-->`./package-copy.js`
`package.ts`-->`./package-status.js`
`package.ts`-->`./utils.js`
`term-formatter.ts`-->`./model.js`
`utils.ts`-->`./barrel.js`
`utils.ts`-->`./model.js`
```
