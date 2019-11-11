import axios from 'axios'
import CONTACT_API from './contactApi'

let instance = axios.create({
    baseURL:'http://localhost:9000/api',
    timeout: 1000
})

//包裹请求方法的容器
const Http = {

}

for (let key in CONTACT_API){
	let api = CONTACT_API[key]\
	Http[key] = async function(params, isFormData=false, config={}){
		let url = api.url
		let newParams = {}
		if(params && isFormData){
			newParams = new FormData()
			for (let i in params){
				newParams.append(i, params[i])
			}
		}else{
			newParams = params
		}

		let response = {}
		if(api.method==='put' || api.method==='post' || api.method==='patch'){
			try{
				response = await instance[api.method](api.url, newParams, config)
			}catch(err){
				response = err
			}
		}else if(api.method === 'delete'){
			
		}
	}
}