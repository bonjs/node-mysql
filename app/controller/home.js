'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		this.ctx.body = 'hi, egg';
	}
	async test() {
		var result = await this.ctx.app.mysql.query('select * from pte_id_ref');
		this.ctx.body = result;
	}
}

module.exports = HomeController;
