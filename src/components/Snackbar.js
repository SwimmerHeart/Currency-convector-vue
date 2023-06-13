import { SnackbarProgrammatic as Snackbar } from 'buefy'

export function snackbarInfo(text) {
    Snackbar.open({
        type: "is-primary",
        message: text
    } )
}
export function snackbarError() {
    Snackbar.open('Look at me!')

}
export function snackbarWarning() {
    Snackbar.open('Look at me!')

}
