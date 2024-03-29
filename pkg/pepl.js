/* eslint-disable @next/next/no-assign-module-variable */

let wasm;

const cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachedUint8Memory0 = new Uint8Array();

function getUint8Memory0() {
    if (cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedInt32Memory0 = new Int32Array();

function getInt32Memory0() {
    if (cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}
/**
* @param {string} content
* @returns {string}
*/
export function main(content) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(content, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        wasm.main(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        var ptr1 = r0;
        var len1 = r1;
        if (r3) {
            ptr1 = 0; len1 = 0;
            throw takeObject(r2);
        }
        return getStringFromWasm0(ptr1, len1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(ptr1, len1);
    }
}

/**
*/
export const ErrorkindOnInterpreter = Object.freeze({ TackNotFound:0,"0":"TackNotFound",NoItemInTack:1,"1":"NoItemInTack",InvalidNumber:2,"2":"InvalidNumber",NoSuchCharacter:3,"3":"NoSuchCharacter", });
/**
*/
export const ErrorkindOnLexer = Object.freeze({ InvalidToken:0,"0":"InvalidToken",NoContent:1,"1":"NoContent",NoValuePut:2,"2":"NoValuePut",BackslashAfterLastCommand:3,"3":"BackslashAfterLastCommand",NoOpeningLoop:4,"4":"NoOpeningLoop",NoEndOrElseIf:5,"5":"NoEndOrElseIf",NoClosingLoop:6,"6":"NoClosingLoop",NoOpeningIf:7,"7":"NoOpeningIf", });
/**
*/
export class Error {

    static __wrap(ptr) {
        const obj = Object.create(Error.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_error_free(ptr);
    }
    /**
    * @returns {ErrorOnLexer | undefined}
    */
    get error_on_lexer() {
        const ret = wasm.__wbg_get_error_error_on_lexer(this.ptr);
        return ret === 0 ? undefined : ErrorOnLexer.__wrap(ret);
    }
    /**
    * @param {ErrorOnLexer | undefined} arg0
    */
    set error_on_lexer(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ErrorOnLexer);
            ptr0 = arg0.ptr;
            arg0.ptr = 0;
        }
        wasm.__wbg_set_error_error_on_lexer(this.ptr, ptr0);
    }
    /**
    * @returns {ErrorOnInterpreter | undefined}
    */
    get error_on_interpreter() {
        const ret = wasm.__wbg_get_error_error_on_interpreter(this.ptr);
        return ret === 0 ? undefined : ErrorOnInterpreter.__wrap(ret);
    }
    /**
    * @param {ErrorOnInterpreter | undefined} arg0
    */
    set error_on_interpreter(arg0) {
        let ptr0 = 0;
        if (!isLikeNone(arg0)) {
            _assertClass(arg0, ErrorOnInterpreter);
            ptr0 = arg0.ptr;
            arg0.ptr = 0;
        }
        wasm.__wbg_set_error_error_on_interpreter(this.ptr, ptr0);
    }
    /**
    * @returns {boolean}
    */
    get error_kind() {
        const ret = wasm.__wbg_get_error_error_kind(this.ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set error_kind(arg0) {
        wasm.__wbg_set_error_error_kind(this.ptr, arg0);
    }
}
/**
*/
export class ErrorOnInterpreter {

    static __wrap(ptr) {
        const obj = Object.create(ErrorOnInterpreter.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_erroroninterpreter_free(ptr);
    }
    /**
    * @returns {number}
    */
    get kind() {
        const ret = wasm.__wbg_get_erroroninterpreter_kind(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set kind(arg0) {
        wasm.__wbg_set_erroroninterpreter_kind(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get position() {
        const ret = wasm.__wbg_get_erroroninterpreter_position(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set position(arg0) {
        wasm.__wbg_set_erroroninterpreter_position(this.ptr, arg0);
    }
}
/**
*/
export class ErrorOnLexer {

    static __wrap(ptr) {
        const obj = Object.create(ErrorOnLexer.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_erroronlexer_free(ptr);
    }
    /**
    * @returns {number}
    */
    get kind() {
        const ret = wasm.__wbg_get_erroronlexer_kind(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set kind(arg0) {
        wasm.__wbg_set_erroronlexer_kind(this.ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get position() {
        const ret = wasm.__wbg_get_erroroninterpreter_position(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set position(arg0) {
        wasm.__wbg_set_erroroninterpreter_position(this.ptr, arg0);
    }
}
/**
*/
export class Options {

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_options_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    get debug() {
        const ret = wasm.__wbg_get_options_debug(this.ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set debug(arg0) {
        wasm.__wbg_set_options_debug(this.ptr, arg0);
    }
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function getImports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_prompt_d23c34618907c7dd = function(arg0, arg1, arg2) {
        const ret = prompt(getStringFromWasm0(arg1, arg2));
        const ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    };
    imports.wbg.__wbg_error_new = function(arg0) {
        const ret = Error.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function initMemory(imports, maybe_memory) {

}

function finalizeInit(instance, module) {
    wasm = instance.exports;
    init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = new Int32Array();
    cachedUint8Memory0 = new Uint8Array();


    return wasm;
}

function initSync(bytes) {
    const imports = getImports();

    initMemory(imports);

    const module = new WebAssembly.Module(bytes);
    const instance = new WebAssembly.Instance(module, imports);

    return finalizeInit(instance, module);
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = new URL('pepl_bg.wasm', import.meta.url);
    }
    const imports = getImports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    initMemory(imports);

    const { instance, module } = await load(await input, imports);

    return finalizeInit(instance, module);
}

export { initSync }
export default init;
