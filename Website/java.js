function doPost(e) {
    try {

        // datei von website
        var fileData = e.paramenter.datei;
        var blob = e.paramenter.filecount;

        // datei in google drive speichern
        var folder = DriveApp.getRootFolder();
        var contenttype = e.paramenter.mimeType;
        var decoded = Utilities.base64Decode(e.parameter.fileData);
        var file = folder.createFile(Utilities.newBlob(decoded, contenttype, e.paramenter.fileName));
        // Email versenden
        MailApp.sendEmail({
            to: "TriggerDiggrSkibidiNi@gmail.com",
            subject: "Auftrag!",
            body: "Name: " + e.paramenter.name + "\nE-Mail: " + e.paramenter.email + "\nDatei-Link: " + file.getUrl()
        });

        return ContentService.createTextOutput("Erfolg!").setMimeType(ContentService.Mimetype.TEXT);
    }   catch (f) {
        return ContentService.createTextOutput("Fehler: " + f.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}