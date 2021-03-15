#!/usr/bin/env node
const fs = require('fs-extra');
const chalk = require('chalk');

const { R, src } = require('../../paths');

const VUEX_BASE_DIR = 'store';
const MOD_NAME = process.env.VXMOD_NAME;

const FOPTS = {
  encoding: 'utf8',
};

const { generateCnsts } = require('./index');

main();

function main() {
  if (!MOD_NAME) {
    console.log(chalk.redBright(`Please set VXMOD_NAME arg in process.env.`));
    process.exit();
  }

  const VUEX_MODULE_PATH = R(src, VUEX_BASE_DIR, 'modules', MOD_NAME);
  if (fs.existsSync(VUEX_MODULE_PATH)) {
    console.log(
      chalk.redBright(`${VUEX_MODULE_PATH} exists. can not overirde.`),
    );
    process.exit();
  }
  fs.ensureDir(VUEX_MODULE_PATH);

  createActions(VUEX_MODULE_PATH);
  createGetters(VUEX_MODULE_PATH);

  createMutations(VUEX_MODULE_PATH);
  createIndex(VUEX_MODULE_PATH);
  createCnsts(VUEX_MODULE_PATH);
}

function createCnsts(modPath) {
  if (!!generateCnsts) {
    let cnstName = MOD_NAME.split('-')
      .map((it) => it.toUpperCase())
      .join('_');
    const CNSTS_TPL = `export const ${cnstName} = {};\n`;
    fs.outputFileSync(R(modPath, 'mod-cnsts.js'), CNSTS_TPL, FOPTS);
  }
}

function createActions(modPath) {
  const ACTION_TPL = `import * as types from './mutation-types';\n`;
  fs.outputFileSync(R(modPath, 'actions.js'), ACTION_TPL, FOPTS);
}

function createGetters(modPath) {
  const GETTERS_TPL = ``;
  fs.outputFileSync(R(modPath, 'getters.js'), GETTERS_TPL, FOPTS);
}

function createMutations(modPath) {
  const MUTATION_TYPES_TPL = `export default {};\n`;
  const MUTATIONS_TPL = `import * as types from './mutation-types';\nexport default {};\n`;
  fs.outputFileSync(R(modPath, 'mutation-types.js'), MUTATION_TYPES_TPL, FOPTS);
  fs.outputFileSync(R(modPath, 'mutations.js'), MUTATIONS_TPL, FOPTS);
}

function createIndex(modPath) {
  const INDEX_TPL = `import mutations from './mutations';
import * as actions from './actions';
import * as getters from './getters';

export default {
  namespaced: true,
  state: {},
  actions,
  getters: {
    ...getters,
  },
  mutations,
};\n`;

  fs.outputFileSync(R(modPath, 'index.js'), INDEX_TPL, FOPTS);
}
