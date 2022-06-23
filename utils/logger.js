const chalk = require('chalk');
const moment = require("moment");
const { LoggerError } = require('./CustomError');

function log(content) {
  if (!content) throw new LoggerError('No text found');
  console.log(`${chalk.cyan(`[${moment().format(" HH:mm:ss | DD-MM-YYYY")}]`)} ${chalk.blue.underline(('[LOG]'))} ${content}`)
}

function loader(content) {
  if (!content) throw new LoggerError('No text found');
  console.log(`${chalk.cyan(`[${moment().format(" HH:mm:ss | DD-MM-YYYY")}]`)} ${chalk.green.underline(('[LOADER]'))} ${content}`)
}

function error(content) {
  if (!content) throw new LoggerError('No text found');
  console.log(`${chalk.cyan(`[${moment().format(" HH:mm:ss | DD-MM-YYYY")}]`)} ${chalk.red.underline(('[ERROR]'))} ${content}`)
}

function warn(content) {
  if (!content) throw new LoggerError('No text found');
  console.log(`${chalk.cyan(`[${moment().format(" HH:mm:ss | DD-MM-YYYY")}]`)} ${chalk.yellow.underline(('[WARN]'))} ${content}`)
}

function info(content) {
  if (!content) throw new LoggerError('No text found');
  console.log(`${chalk.cyan(`[${moment().format(" HH:mm:ss | DD-MM-YYYY")}]`)} ${chalk.magenta.underline(('[INFO]'))} ${content}`)
}

function database(content) {
  if (!content) throw new LoggerError('No text found');
  console.log(`${chalk.cyan(`[${moment().format(" HH:mm:ss | DD-MM-YYYY")}]`)} ${chalk.yellowBright.underline(('[DATABASE]'))} ${content}`)
}

module.exports = {
  log,
  loader,
  error,
  warn,
  info,
  database
};
