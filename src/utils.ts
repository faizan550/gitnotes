const R = require('ramda');

export const getAccessToken = (object: any) => {
	const {
		data: { access_token }
	} = object;
	return access_token;
};

export const fetchAction = (action: any) => {
	const fetchActionTemplate = {
		type: '',
		endpoint: null,
		verb: '',
		payload: null,
		headers: {},
		body: null
	};
	return {
		FETCH_ACTION: { ...fetchActionTemplate, ...action }
	};
};

export const getBasicInfoOfPublicGists = (list: any) => {
	return list.map((item: any) => {
		const {
			owner: { login, avatar_url },
			id,
			created_at,
			files,
		} = item;
		const date = created_at.slice(0, 10);
		const time = created_at.slice(11, 19);
		const file: any = Object.values(files)[0];
		const { filename, type, raw_url } = file;

		return { login, avatar_url, id, date, time, filename, type, raw_url, created_at };
	});
};

export const getPublicGistContent = (item: any) => {
console.log(item)
	if (!R.isEmpty(item)) {
		const {
				owner: { login, avatar_url },
				files, description, created_at
			}
		= item;
		const file: any = Object.values(files)[0];
		const { content, filename, type } = file;
		return { content, login, avatar_url, filename, type, description, created_at };
	} 
	else {
		return { content: '', login: '', avatar_url: '', filename: '', type: '' };
	}
};

export const getLioginUserProfileInfo = (data: any) => {
	if (data) {
		const { login, avatar_url } = data;
		return { login, avatar_url };
	} else {
		return {};
	}
};

export const checkGistWithContentExist = (id: any, list: any) => {

		const gist = list.filter((item : any) => {
			if(!R.isEmpty(item)){
				if(item.id == id){
					return item
				}
			}
		})
		return gist;
}

export const getUpdatedPublicGistContent = (item: any, filename : string) => {
		let {files} = item;
		const fileObject = Object.values(files);
		const updatedFile = fileObject.filter((item : any) => item.filename == filename)
		return { ...item, files: updatedFile };
	};

export const calclateTimeDiefference = (time: any) => {
	
	const createdTime : any = new Date(time)
	const currentTime : any = new Date();
	return Math.abs(createdTime-currentTime)/365e5;
}