export interface PhantomResponse{
    publicKey: {
        toString(): StringConstructor
    }
}

declare global {
    interface Window {
        solana?:
        | {isPhantom: false}
        | {
            isPhantom: true
            connect(options? : {onlyIfTrusted: boolean}): Promise<PhantomResponse>
            }
    }
}