/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./FrontProjects/Teacher/src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./FrontProjects/Teacher/src/controllers/MainApp.js":
/*!**********************************************************!*\
  !*** ./FrontProjects/Teacher/src/controllers/MainApp.js ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _views_MainApp_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../views/MainApp.html */ \"./FrontProjects/Teacher/src/views/MainApp.html\");\n/* harmony import */ var _views_MainApp_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_views_MainApp_html__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../commons/Dialog */ \"./FrontProjects/commons/Dialog.js\");\n/* harmony import */ var _commons_components_ClientList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../commons/components/ClientList */ \"./FrontProjects/commons/components/ClientList.js\");\n/* harmony import */ var _net_StudentConnection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../net/StudentConnection */ \"./FrontProjects/Teacher/src/net/StudentConnection.js\");\n\n\n\n\n\nconst MainApp = Vue.component(\"main-app\", {\n    template: _views_MainApp_html__WEBPACK_IMPORTED_MODULE_0___default.a,\n    data() {\n        return {classroomName: \"\"}\n    },\n\n    async mounted() {\n        this._localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});\n        this.$refs.local_preview.srcObject = this._localStream;\n\n        this._socket = io();\n        this._studentConnections = new Map();\n\n        this.addSocketListeners();\n        this.showCreateClassroomDialog();\n    },\n\n    methods: {\n        addSocketListeners() {\n            this._socket.on(\"listClients\", clients => {\n                this.$refs.client_list.setClients(clients);\n            });\n            this._socket.on(\"studentJoinedIn\", data => {\n                this._studentConnections.set(data.studentSid, new _net_StudentConnection__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this._socket, data.studentSid, this._localStream));\n            });\n            this._socket.on(\"studentAnswer\", data => {\n                let sc = this._studentConnections.get(data.from);\n                if (sc) {\n                    sc.studentAnswerHandler(data);\n                }\n            });\n            this._socket.on(\"ice\", data => {\n                let sc = this._studentConnections.get(data.from);\n                if (sc) {\n                    sc.iceHandler(data);\n                }\n            });\n        },\n\n        showCreateClassroomDialog() {\n            _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__[\"default\"].showInput(\"?????????????????????\", function (name) {\n                if (name) {\n                    let ld = _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__[\"default\"].showLoading(\"??????????????????...\");\n                    this._socket.emit(\"createClassroom\", name, function (suc) {\n                        ld.modal(\"hide\");\n                        if (suc) {\n                            this.classroomName = name;\n                            console.log(\"Joined in room\");\n                        } else {\n                            _commons_Dialog__WEBPACK_IMPORTED_MODULE_1__[\"default\"].showMessageBox(\"???????????????????????????????????????\", \"??????\", function () {\n                                this.showCreateClassroomDialog();\n                            }.bind(this));\n                        }\n                    }.bind(this));\n                } else {\n                    this.showCreateClassroomDialog();\n                }\n            }.bind(this), \"static\", false, false, \"\");\n        }\n    }\n});\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MainApp);\n\n\n//# sourceURL=webpack:///./FrontProjects/Teacher/src/controllers/MainApp.js?");

/***/ }),

/***/ "./FrontProjects/Teacher/src/main.js":
/*!*******************************************!*\
  !*** ./FrontProjects/Teacher/src/main.js ***!
  \*******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_MainApp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controllers/MainApp */ \"./FrontProjects/Teacher/src/controllers/MainApp.js\");\n\n\nlet rootElement = document.createElement(\"div\");\ndocument.body.appendChild(rootElement);\n\nnew _controllers_MainApp__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().$mount(rootElement);\n\n//# sourceURL=webpack:///./FrontProjects/Teacher/src/main.js?");

/***/ }),

/***/ "./FrontProjects/Teacher/src/net/StudentConnection.js":
/*!************************************************************!*\
  !*** ./FrontProjects/Teacher/src/net/StudentConnection.js ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass StudentConnection {\n\n\n    constructor(socket, studentSid, stream) {\n        this._socket = socket;\n        this._studentSid = studentSid;\n        this._stream = stream;\n\n        this.asyncInit();\n    }\n\n    async asyncInit() {\n        this._offerPc = new RTCPeerConnection();\n\n        this._offerPc.onicecandidate = e => {\n            if (e.candidate) {\n                this._socket.emit(\"ice\", {from: this._socket.id, to: this._studentSid, ice: e.candidate});\n            }\n        };\n\n        this._stream.getTracks().forEach(t => {\n            this._offerPc.addTrack(t);\n        });\n\n        let offer = await this._offerPc.createOffer();\n        this._socket.emit(\"teacherOffer\", {from: this._socket.id, to: this._studentSid, offer: offer});\n        await this._offerPc.setLocalDescription(new RTCSessionDescription(offer));\n    }\n\n    async studentAnswerHandler(data) {\n        await this._offerPc.setRemoteDescription(new RTCSessionDescription(data.answer));\n        console.log(data);\n    }\n\n    iceHandler(data) {\n        this._offerPc.addIceCandidate(new RTCIceCandidate(data.ice));\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (StudentConnection);\n\n//# sourceURL=webpack:///./FrontProjects/Teacher/src/net/StudentConnection.js?");

/***/ }),

/***/ "./FrontProjects/Teacher/src/views/MainApp.html":
/*!******************************************************!*\
  !*** ./FrontProjects/Teacher/src/views/MainApp.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>\\n    <div class=\\\"card\\\">\\n        <div class=\\\"card-header font-weight-bold\\\">\\n            ????????????{{classroomName}}\\n        </div>\\n        <div style=\\\"display: flex;flex-direction: row;\\\">\\n            <div style=\\\"display: flex;flex-direction: column;width: 220px\\\">\\n                <client-list ref=\\\"client_list\\\"></client-list>\\n                <video style=\\\"width: 200px;height: 150px;display: block\\\" autoplay ref=\\\"local_preview\\\"></video>\\n            </div>\\n        </div>\\n    </div>\\n</div>\";\n\n//# sourceURL=webpack:///./FrontProjects/Teacher/src/views/MainApp.html?");

/***/ }),

/***/ "./FrontProjects/commons/Dialog.js":
/*!*****************************************!*\
  !*** ./FrontProjects/commons/Dialog.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Dialog = {\n    showInput(title, callback, backdrop = true, keyboard = true, showCloseBtn = true, cancelBtnLabel = \"??????\", okBtnLabel = \"??????\") {\n        $(`<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"exampleModalLabel\">${title}</h5>\n        ${showCloseBtn ? \"<button type=\\\"button\\\" class=\\\"close\\\" data-dismiss=\\\"modal\\\" aria-label=\\\"Close\\\"><span aria-hidden=\\\"true\\\">&times;</span></button>\" : \"\"}\n      </div>\n      <div class=\"modal-body\">\n        <input type=\"text\" class=\"message-input form-control\">\n      </div>\n      <div class=\"modal-footer\">\n        ${cancelBtnLabel ? \"<button type=\\\"button\\\" class=\\\"btn btn-secondary\\\" data-dismiss=\\\"modal\\\">\" + cancelBtnLabel + \"</button>\" : \"\"}\n        ${okBtnLabel ? \"<button type=\\\"button\\\" class=\\\"btn btn-primary\\\" data-dismiss=\\\"modal\\\">\" + okBtnLabel + \"</button>\" : \"\"}\n      </div>\n    </div>\n  </div>\n</div>`).appendTo(document.body).modal({\n            keyboard: keyboard,\n            backdrop: backdrop\n        }).on(\"hidden.bs.modal\", function () {\n            let jqThis = $(this);\n            if (callback) {\n                callback(jqThis.find(\".message-input\").val());\n            }\n            jqThis.remove();\n        });\n    },\n\n    showMessageBox(msg, title = \"\", closeCallback = null) {\n        $(`<div class=\"modal fade\" id=\"staticBackdrop\" data-backdrop=\"static\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"staticBackdropLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h5 class=\"modal-title\" id=\"staticBackdropLabel\">${title}</h5>\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n          <span aria-hidden=\"true\">&times;</span>\n        </button>\n      </div>\n      <div class=\"modal-body\">\n        ${msg}\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">OK</button>\n      </div>\n    </div>\n  </div>\n</div>`).appendTo(document.body).modal().on(\"hidden.bs.modal\", function () {\n            $(this).remove();\n\n            if (closeCallback) {\n                closeCallback();\n            }\n        });\n    },\n\n\n    showLoading(msg) {\n        return $(`<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-body\">\n        ${msg}\n      </div>\n    </div>\n  </div>\n</div>`).modal({\n            keyboard: false,\n            backdrop: \"static\"\n        }).on(\"hidden.bs.modal\", function () {\n            $(this).remove();\n        });\n    }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Dialog);\n\n//# sourceURL=webpack:///./FrontProjects/commons/Dialog.js?");

/***/ }),

/***/ "./FrontProjects/commons/components/ClientList.html":
/*!**********************************************************!*\
  !*** ./FrontProjects/commons/components/ClientList.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"card\\\" style=\\\"width: 220px;\\\">\\n    <div class=\\\"card-header\\\">\\n        ?????????\\n    </div>\\n    <div>\\n        <div v-for=\\\"c in clients\\\">\\n            {{c}}\\n        </div>\\n    </div>\\n</div>\";\n\n//# sourceURL=webpack:///./FrontProjects/commons/components/ClientList.html?");

/***/ }),

/***/ "./FrontProjects/commons/components/ClientList.js":
/*!********************************************************!*\
  !*** ./FrontProjects/commons/components/ClientList.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _ClientList_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientList.html */ \"./FrontProjects/commons/components/ClientList.html\");\n/* harmony import */ var _ClientList_html__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ClientList_html__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst ClientList = Vue.component(\"client-list\", {\n    template: _ClientList_html__WEBPACK_IMPORTED_MODULE_0___default.a,\n\n    data() {\n        return {\n            clients: []\n        };\n    },\n\n    methods: {\n        setClients(clients) {\n            this.clients.length = 0;\n            this.clients.push(...clients);\n        }\n    }\n});\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ClientList);\n\n//# sourceURL=webpack:///./FrontProjects/commons/components/ClientList.js?");

/***/ })

/******/ });