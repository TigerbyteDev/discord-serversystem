import { join } from "../deps.ts"
import {loaderMap} from "../types.ts"

export const buttonLoader = async (map: loaderMap, dirname: string) => {
    console.log("Lade Buttons...");

    const buttons = await Deno.readDir(join(dirname, "./buttons"))

    for await (const file of buttons) {
        let status = false
        if (!file.name.endsWith(".ts")) continue;
        const {buttonSetup} = await import(`../buttons/${file.name}`)

        if (buttonSetup?.ignore) continue;
        if (buttonSetup?.button.customID) {
            map.buttons.set(buttonSetup.button.customID, buttonSetup)
            status = true
        } else {
            console.log(buttonSetup)
            console.log(`Name in ${file.name} nicht gefunden. Richtig exportiert?`)
        }

        console.log(`button: ${buttonSetup?.button.customID} | datei: ${file.name} | geladen: ${status}`)
    }
}
