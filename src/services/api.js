const PRUEBA_KO = 'pruebaKO123';

const HTTP_CODES = {
	OK: 200,
	UNAUTHORIZED: 401,
}

const RESPONSE_OK = {status: HTTP_CODES.OK};
const RESPONSE_KO = {status: HTTP_CODES.UNAUTHORIZED};

const submitForm = (pass, repass, optionalQuestion) => 
	new Promise((resolve, reject) =>
		setTimeout(() => 
			pass !== PRUEBA_KO
			? resolve(RESPONSE_OK)
			: reject(RESPONSE_KO)
		, 3000)
)

export {
	submitForm, HTTP_CODES
}