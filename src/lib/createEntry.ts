import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

export default function createEntry(entryPath: string): string {
  if (!existsSync(join(__dirname, "../tmp"))) {
    mkdirSync(join(__dirname, "../tmp"));
  }
  writeFileSync(
    join(__dirname, "../tmp/entry.ts"),
    [
      `import main from "${entryPath}"`,
      "const args = {}",
      "if(GM_info.script.grant !== undefined){",
      " GM_info.script.grant.forEach(propatyName => {",
      '   let keyName = propatyName.split("GM_")[1];',
      '   if(keyName === "xmlhttpRequest"){',
      '     keyName = "xmlHttpRequest"',
      "   }",
      "   args[propatyName] = GM[keyName]",
      " })",
      "}",
      "main(args);",
    ].join("\n")
  );

  return join(__dirname, "../tmp/entry.ts");
}
