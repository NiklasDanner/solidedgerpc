const Url = 'https://solidpdfmerge.azurewebsites.net/api/merge'
var fileList = []
var bytes = []



function addPdf() {

    i = 0
    while (i < addPdfInput.files.length) {
        fileList.push(addPdfInput.files[i]);
        var node = document.createElement("LI"); // Create a <li> node
        var textnode = document.createTextNode(addPdfInput.files[i].name); // Create a text node
        node.appendChild(textnode); // Append the text to <li>
        document.getElementById("pdf_list").appendChild(node);
        i++;
    }

    i = 0



    while (i < fileList.length) {

        i++;
    }

    console.log(fileList)
}


function mergePdf() {
    if (fileList.length >= 2) {
        console.log("looooong")




        var reader = new FileReader();
        reader.readAsArrayBuffer(fileList[0]);

        reader.onload = function () {
            var arrayBuffer = reader.result
            bytes.push(new Uint8Array(arrayBuffer));
            getSecondPdf()
        }
    }
}

function sendHttp() {
    console.log(bytes[1]);
    var pdfJSON = {
        Pdf1: bytes[0],
        Pdf2: bytes[1]
    };



    //console.log("Pdf JSON: " + pdfJSON.Pdf1);
    // console.log("Pdf JSON: " + JSON.stringify(pdfJSON));

    //$.get(Url, function (data, status) {
    //    alert("Data: " + data + "\nStatus: " + status);
    //});
    //$.post(Url, pdfJSON, function (data, status) {
    //     console.log(data + ' and status is ' + status)

    //});

    var formData = new FormData();
    formData.append("files", fileList[0]);
    formData.append("files", fileList[1]);

    $.ajax({
        type: 'post',
        url: Url,
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            var file = new Blob([data], {
                type: 'application/pdf'
            });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
            console.log(data)
        }
    });


}

function getSecondPdf() {

    var reader1 = new FileReader();
    reader1.readAsArrayBuffer(fileList[1]);
    reader1.onload = function () {
        var arrayBuffer = reader1.result
        bytes.push(new Uint8Array(arrayBuffer));
        // console.log(bytes2);
        sendHttp();
    }
}
