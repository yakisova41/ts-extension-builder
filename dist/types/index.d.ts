/// <reference types="tampermonkey" />
export interface GM_args {
    GM_xmlhttpRequest?: typeof GM_xmlhttpRequest;
    GM_info?: typeof GM_info;
    GM_getValue?: typeof GM_getValue;
    GM_setValue?: typeof GM_setValue;
    GM_deleteValue?: typeof GM_deleteValue;
    GM_listValues?: typeof GM_listValues;
    GM_addValueChangeListener?: typeof GM_addValueChangeListener;
    GM_removeValueChangeListener?: typeof GM_removeValueChangeListener;
    GM_getResourceText?: typeof GM_getResourceText;
    GM_getResourceURL?: typeof GM_getResourceURL;
    GM_addStyle?: typeof GM_addStyle;
    GM_registerMenuCommand?: typeof GM_registerMenuCommand;
    GM_unregisterMenuCommand?: typeof GM_unregisterMenuCommand;
    GM_notification?: typeof GM_notification;
    GM_setClipboard?: typeof GM_setClipboard;
    GM_download?: typeof GM_download;
}
