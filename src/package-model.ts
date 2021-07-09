import { z as zod } from "zod";

export interface PackageJson {
    name:             string;
    description:      string;
    keywords:         string[];
    author:           Author | string;
    version:          string;
    license:          string;
    homepage:         string;
    repository:       Repository;
    main:             string;
    typings:          string;
    files:            string[];
    engines:          Engines;
    scripts:          Scripts;
    module:           string;
    devDependencies:  Dependencies;
    dependencies:  Dependencies;
    peerDependencies: Dependencies;
}

export interface Author {
    name: string;
    url:  string;
}

export interface Dependencies {
    [key: string]: string;
}

export interface Engines {
    node: string;
}

export interface Repository {
    type: string;
    url:  string;
}

export interface Scripts {
    [key: string]: string;
}

const fromString = (_: string): PackageJson | string => {
    return "todo"
}

const toString = (_: PackageJson): string => {
    return "todo"
}

export { fromString, toString}
