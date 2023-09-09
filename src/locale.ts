export default {
    resourceNotFound: (resourceName: string) => `${resourceName} not found.`,
    resourceAlreadyExists: (resourceName: string) => `${resourceName} already exists.`,
    resourceForbidden: (resourceName: string) => `Access to ${resourceName} is restricted.`,

    resourceCreated: (resourceName: string) => `${resourceName} created.`,
    resourceRead: (resourceName: string) => `${resourceName} found.`,
    resourceUpdated: (resourceName: string) => `${resourceName} updated.`,
    resourceDeleted: (resourceName: string) => `${resourceName} deleted.`,
    
    resourceCreateFail: (resourceName: string) => `Failed to create ${resourceName}.`,
    resourceReadFail: (resourceName: string) => `Failed to read ${resourceName}.`,
    resourceUpdateFail: (resourceName: string) => `Failed to update ${resourceName}.`,
    resourceDeleteFail: (resourceName: string) => `Failed to delete ${resourceName}.`,

    unknownFail: `An unknown error occurred.`
} as const;
