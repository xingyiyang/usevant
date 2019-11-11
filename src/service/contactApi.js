const CONTACT_API = {
	getContactList:{
		method: 'get',
		url: '/contactList'
	},
	newContactJson:{
		method: 'post',
		url: '/contact/new/json'
	},
	editContact:{
		method: 'put',
		url: '/contact/edit'
	},
	delContact: {
		method: 'delete',
		url: '/conatct'
	}
}

export default CONTACT_API