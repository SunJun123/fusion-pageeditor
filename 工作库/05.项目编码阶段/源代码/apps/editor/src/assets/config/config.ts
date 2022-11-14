/*
 * @Descripttion:
 * @version:
 * @Author: zhoull
 * @Date: 2022-08-26 18:06:09
 * @LastEditors: wzw
 * @LastEditTime: 2022-10-19 09:47:13
 */
(function () {
	let deployConfig: object | null;
	deployConfig = {
		baseUrl: "http://192.168.34.79:9090/",
	};
	(window as any)["deployConfig"] = deployConfig;
	deployConfig = null;
})();
