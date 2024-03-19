import type { ProjectConfiguration } from 'nx/src/config/workspace-json-project-json';
import { Workspaces } from 'nx/src/config/workspaces';

type getProjectsOps = (
	cwd?: string,
	selector?: (params: Pick<ProjectConfiguration, 'name' | 'projectType' | 'tags'>) => boolean
) => string[];

/**
 * **Based on @commitlint/config-nx-scopes**
 *
 * Gets all scopes
 *
 * @see https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-nx-scopes#commitlintconfig-nx-scopes
 *
 * @param cwd the target working directory for loading nx configuration
 * @param selector the filtering callback to delimite output scopes
 */
export const getScopes: getProjectsOps = (cwd = process.cwd(), selector = () => true) => {
	const ws = new Workspaces(cwd);
	const workspace = ws.readWorkspaceConfiguration();
	const rawProjects = Object.entries(workspace.projects || {}).map(([name, project]) => ({
		name,
		...project,
	}));

	// Custom scopes defined for project
	const definedScopes = ['tpl', 'project'];

	return [
		...definedScopes,
		...rawProjects
			.filter(project =>
				selector({
					name: project.name,
					projectType: project.projectType,
					tags: project.tags,
				})
			)
			.filter(project => project.targets)
			.map(project => project.name)
			.map(name => (name.charAt(0) === '@' ? name.split('/')[1] : name)),
	];
};
