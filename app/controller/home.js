'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
	async index() {
		this.ctx.body = 'hi, egg';
	}
	async test() {
		var mysqlValue = await this.ctx.app.mysql.query('select * from pte_id_ref');
		//this.ctx.body = result;
		
		await this.ctx.app.redis.set('username', 'sun');
		var redisValue = await this.ctx.app.redis.get('username');
		
		
		await this.ctx.render('test', {
			mysqlValue: mysqlValue,
			redisValue: redisValue
		});
	}
}

module.exports = HomeController;
