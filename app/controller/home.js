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
	
	// 消息菜单
	async menuList() {
		
		console.log('menuList', this.ctx.request.body);
		
		this.ctx.body = 'menuList';
	}
	
	// 选择下拉时
	async sendRequest() {
		
		console.log('sendRequest', this.ctx.request.body);
		this.ctx.body = 'sendRequest';
	}
	
	// commond
	async sun() {
		let {response_url, token, trigger_id} = this.ctx.request.body;
		console.log('response_url: ' + JSON.stringify(this.ctx.request.body));
		
		setTimeout(async() => {
			this.ctx.curl(response_url, {
				method : 'post',
				contentType : 'json',
				data : (function() {
					
					let profile_list = [{
							"text": "cnblogs.com",
							"value": "1e9e2fa8$+08:00"
						},
						{
							"text": "cnblogs",
							"value": "1e9e2fa8$+08:00"
						}
					]

					return {
						"text": "welcome to use ptengine manage your data !",
						// "response_type": "in_channel",
						"attachments": [{
							"text": "Please choose a profile",
							"color": "#008008",
							"attachment_type": "default",
							"callback_id": "timerange_selection",
							"actions": [{
								"name": "profile_list",
								"text": "Choose  a  profile...",
								"type": "select",
								"options": profile_list

							}]
						}]
					}
				})()
			})
		}, 0);
		this.ctx.body = ':robot_face:Your data is on the road...:rocket:'; // 'hello ptengine';
	}
	
	async auth() {
		let code = this.ctx.query.code;

        console.log(this.config.slack);
        console.log('code: ' + code);

        let client_id = this.config.slack.ClientID,
            client_secret = this.config.slack.ClientSecret,
            redirect_url = 'https://slack.ptengine.com/slack/auth';

        let res = await this.ctx.curl('https://slack.com/api/oauth.access', {
            method: 'get',
            contentType: 'application/x-www-form-urlencoded',
            data: {
                client_id,
                client_secret,
                redirect_url,
                code
            }
        });

        let data = JSON.parse(res.data.toString());
        if (data.incoming_webhook) {
            let response_url = data.incoming_webhook.url; //https://hooks.slack.com/services/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

            this.ctx.curl(response_url, {
                method: 'post',
                contentType: 'json',
                data: this.ctx.service.slackResponse.createAuthSuccessResponse()
            })
        }

        let html = `
        <!DOCTYPE html>
        <html>
            <head></head>
            <body>
                <h1>您已经成功安装ptengine slack app ><h1>
                <h2>以下是详细信息</h2>
                <div>
                    ${JSON.stringify(data)}
                </div>
            </body>
        </html>
        `
        this.ctx.contentType = 'text/html';
        this.ctx.body = html;
	}
}

module.exports = HomeController;
