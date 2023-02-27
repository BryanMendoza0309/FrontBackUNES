(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-external-tourvirtual-tourvirtual-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/components/external/tourvirtual/tourvirtual.page.html":
/*!*************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/external/tourvirtual/tourvirtual.page.html ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header title=\"{{properties.titleVirtualTour}}\"></app-header>\n\n<ion-content>\n  <iframe class= 'webPage' name= \"samplePage\" [src]=\"url | safe\"></iframe>\n</ion-content>\n"

/***/ }),

/***/ "./src/app/components/external/tourvirtual/tourvirtual.module.ts":
/*!***********************************************************************!*\
  !*** ./src/app/components/external/tourvirtual/tourvirtual.module.ts ***!
  \***********************************************************************/
/*! exports provided: TourvirtualPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TourvirtualPageModule", function() { return TourvirtualPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _tourvirtual_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tourvirtual.page */ "./src/app/components/external/tourvirtual/tourvirtual.page.ts");
/* harmony import */ var _components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components.module */ "./src/app/components/components.module.ts");
/* harmony import */ var _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../pipes/pipes.module */ "./src/app/pipes/pipes.module.ts");









const routes = [
    {
        path: '',
        component: _tourvirtual_page__WEBPACK_IMPORTED_MODULE_6__["TourvirtualPage"]
    }
];
let TourvirtualPageModule = class TourvirtualPageModule {
};
TourvirtualPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
            _components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"],
            _pipes_pipes_module__WEBPACK_IMPORTED_MODULE_8__["PipesModule"]
        ],
        declarations: [_tourvirtual_page__WEBPACK_IMPORTED_MODULE_6__["TourvirtualPage"]]
    })
], TourvirtualPageModule);



/***/ }),

/***/ "./src/app/components/external/tourvirtual/tourvirtual.page.scss":
/*!***********************************************************************!*\
  !*** ./src/app/components/external/tourvirtual/tourvirtual.page.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".webPage {\n  width: 100%;\n  height: 99%;\n  border: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHJlc21vcmFsZXMvSW3DoWdlbmVzL2FwcC1hc2FtYmxlYTIvc3JjL2FwcC9jb21wb25lbnRzL2V4dGVybmFsL3RvdXJ2aXJ0dWFsL3RvdXJ2aXJ0dWFsLnBhZ2Uuc2NzcyIsInNyYy9hcHAvY29tcG9uZW50cy9leHRlcm5hbC90b3VydmlydHVhbC90b3VydmlydHVhbC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZXh0ZXJuYWwvdG91cnZpcnR1YWwvdG91cnZpcnR1YWwucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLndlYlBhZ2V7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDk5JTtcbiAgYm9yZGVyOiBub25lO1xufSIsIi53ZWJQYWdlIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogOTklO1xuICBib3JkZXI6IG5vbmU7XG59Il19 */"

/***/ }),

/***/ "./src/app/components/external/tourvirtual/tourvirtual.page.ts":
/*!*********************************************************************!*\
  !*** ./src/app/components/external/tourvirtual/tourvirtual.page.ts ***!
  \*********************************************************************/
/*! exports provided: TourvirtualPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TourvirtualPage", function() { return TourvirtualPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _properties_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../properties/properties */ "./src/app/properties/properties.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");




let TourvirtualPage = class TourvirtualPage {
    constructor(properties) {
        this.properties = properties;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urlTourVirtual;
    }
    ngOnInit() {
    }
};
TourvirtualPage.ctorParameters = () => [
    { type: _properties_properties__WEBPACK_IMPORTED_MODULE_2__["Properties"] }
];
TourvirtualPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tourvirtual',
        template: __webpack_require__(/*! raw-loader!./tourvirtual.page.html */ "./node_modules/raw-loader/index.js!./src/app/components/external/tourvirtual/tourvirtual.page.html"),
        styles: [__webpack_require__(/*! ./tourvirtual.page.scss */ "./src/app/components/external/tourvirtual/tourvirtual.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_properties_properties__WEBPACK_IMPORTED_MODULE_2__["Properties"]])
], TourvirtualPage);



/***/ })

}]);
//# sourceMappingURL=components-external-tourvirtual-tourvirtual-module-es2015.js.map