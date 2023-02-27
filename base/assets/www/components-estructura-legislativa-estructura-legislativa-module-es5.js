(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["components-estructura-legislativa-estructura-legislativa-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/components/estructura-legislativa/estructura-legislativa.page.html":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/components/estructura-legislativa/estructura-legislativa.page.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-header title=\"{{properties.titleConformation}}\"></app-header>\n\n<ion-content>\n  <ion-tabs>\n    <ion-tab-bar slot=\"top\" style=\"height: 0;\">\n      <!--<ion-tab-button  tab=\"tabAmbito\">\n        <ion-icon name=\"md-globe\"></ion-icon>\n        <ion-label>Ambito Territorial</ion-label>\n      </ion-tab-button>-->\n\n      <ion-tab-button tab=\"tabComision\">\n        <!--<ion-icon name=\"contacts\"></ion-icon>\n        <ion-label>Comisiones</ion-label>-->\n      </ion-tab-button>\n    </ion-tab-bar>\n  </ion-tabs>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/components/estructura-legislativa/estructura-legislativa.module.ts":
/*!************************************************************************************!*\
  !*** ./src/app/components/estructura-legislativa/estructura-legislativa.module.ts ***!
  \************************************************************************************/
/*! exports provided: EstructuraLegislativaPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstructuraLegislativaPageModule", function() { return EstructuraLegislativaPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _estructura_legislativa_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./estructura-legislativa.page */ "./src/app/components/estructura-legislativa/estructura-legislativa.page.ts");
/* harmony import */ var _components_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components.module */ "./src/app/components/components.module.ts");








var routes = [
    {
        path: '',
        component: _estructura_legislativa_page__WEBPACK_IMPORTED_MODULE_6__["EstructuraLegislativaPage"],
        children: [
            {
                path: 'tabAmbito',
                children: [
                    {
                        path: '',
                        loadChildren: '../tabs/tab-ambito/tab-ambito.module#TabAmbitoPageModule'
                    }
                ]
            },
            {
                path: 'tabComision',
                children: [
                    {
                        path: '',
                        loadChildren: '../tabs/tab-comision/tab-comision.module#TabComisionPageModule'
                    }
                ]
            },
            {
                path: '',
                redirectTo: 'tabComision',
                pathMatch: 'full'
            }
        ]
    }
];
var EstructuraLegislativaPageModule = /** @class */ (function () {
    function EstructuraLegislativaPageModule() {
    }
    EstructuraLegislativaPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _ionic_angular__WEBPACK_IMPORTED_MODULE_5__["IonicModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(routes),
                _components_module__WEBPACK_IMPORTED_MODULE_7__["ComponentsModule"]
            ],
            exports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"]
            ],
            declarations: [_estructura_legislativa_page__WEBPACK_IMPORTED_MODULE_6__["EstructuraLegislativaPage"]]
        })
    ], EstructuraLegislativaPageModule);
    return EstructuraLegislativaPageModule;
}());



/***/ }),

/***/ "./src/app/components/estructura-legislativa/estructura-legislativa.page.scss":
/*!************************************************************************************!*\
  !*** ./src/app/components/estructura-legislativa/estructura-legislativa.page.scss ***!
  \************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NvbXBvbmVudHMvZXN0cnVjdHVyYS1sZWdpc2xhdGl2YS9lc3RydWN0dXJhLWxlZ2lzbGF0aXZhLnBhZ2Uuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/components/estructura-legislativa/estructura-legislativa.page.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/components/estructura-legislativa/estructura-legislativa.page.ts ***!
  \**********************************************************************************/
/*! exports provided: EstructuraLegislativaPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EstructuraLegislativaPage", function() { return EstructuraLegislativaPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _properties_properties__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../properties/properties */ "./src/app/properties/properties.ts");



var EstructuraLegislativaPage = /** @class */ (function () {
    function EstructuraLegislativaPage(properties) {
        this.properties = properties;
    }
    EstructuraLegislativaPage.prototype.ngOnInit = function () {
    };
    EstructuraLegislativaPage.ctorParameters = function () { return [
        { type: _properties_properties__WEBPACK_IMPORTED_MODULE_2__["Properties"] }
    ]; };
    EstructuraLegislativaPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-estructura-legislativa',
            template: __webpack_require__(/*! raw-loader!./estructura-legislativa.page.html */ "./node_modules/raw-loader/index.js!./src/app/components/estructura-legislativa/estructura-legislativa.page.html"),
            styles: [__webpack_require__(/*! ./estructura-legislativa.page.scss */ "./src/app/components/estructura-legislativa/estructura-legislativa.page.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_properties_properties__WEBPACK_IMPORTED_MODULE_2__["Properties"]])
    ], EstructuraLegislativaPage);
    return EstructuraLegislativaPage;
}());



/***/ })

}]);
//# sourceMappingURL=components-estructura-legislativa-estructura-legislativa-module-es5.js.map