export const _ContentType = Object.freeze({
    CHANGE_CIPHER_SPEC :    20,
    ALERT              :    21,
    HANDSHAKE          :    22,
    APPLICATION_DATA   :    23
})
  
export const _Version = Object.freeze({
    MAJOR              :   3,
    MINOR              :   5
})

export const _Handshake = Object.freeze({
    HELLO_REQUEST       :       0,
    CLIENT_HELLO        :       1,
    SERVER_HELLO        :       2,
    CERTIFICATE         :      11,
    SERVER_KEY_EXCHANGE :      12,
    CERTIFICATE_REQUEST :      13,
    SERVER_DONE         :      14,
    CERTIFICATE_VERIFY  :      15,
    CLIENT_KEY_EXCHANGE :      16,
    FINISHED            :      20,
})