import * as React from "react";
import "./Hello.module.scss";

export interface IProps {
  name: string;
  onOpenFile?: () => void;
}

function Hello({ name,  onOpenFile }: IProps) {
  return (
    <div className="hello">
      <div className="greeting">Hello </div>
        <div>
          <input type="file" id="myFile" />
          <button onClick={onReadFile}>OK</button>
          <textarea className="outputArea" id="filetext" >output</textarea>
          <label id="debug">Stuff</label>
        </div>
      </div>
  );
}

export default Hello;

function onReadFile() {
    var file = (document.getElementById("myFile") as HTMLInputElement).files[0];
    const read = new FileReader();
    read.readAsArrayBuffer(file);
    document.getElementById("debug").textContent = file.type;
    read.onloadend = function() {
      const arr = new Uint8Array(read.result);
      const str = String.fromCharCode.apply(String, arr);
      // if(/[\u0080-\uffff]/.test(str)) {
      //    throw new Error("this string seems to contain (still encoded) multibytes");
      // }
      var finalLine = "";
      const asline = str.split("\n");
      const arrayLength = asline.length;
      const myRe = " \\d{5} ";
      var lineLength = 0;
      var station = "";
      var o = 0;
      try {
        for (var i = 0; i < arrayLength; i++) {
          const n = asline[i].split(";");
          lineLength = n.length;
          station = "";
          for (o = 0; o < lineLength; o++) {
            const line = n[o].trim();
            if (line.length > 2) {
                station = line.match(myRe);
            }
            else if (line !== "" && line !== "\n" && line !== "\r") {
              finalLine += station[0] + "2018-05-" + line + "\n";
            }
          }
        }
      }
      catch(err) {
        console.log(err.message + " : " + o);
      }
      // Raden skickas ned till servern och tar ut all data och hämta data fårn databasen
      // och sen skickar den tillbaka en lång sträng som man läser ut i textarean
      // sen kanske nått skript som sparar ner datan om man klickar på en knapp
      (document.getElementById("filetext") as HTMLTextAreaElement).value = finalLine;
    };
}