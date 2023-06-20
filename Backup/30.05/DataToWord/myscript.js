var json = {};

function to_json(workbook) {
    //if (useworker && workbook.SSF) XLSX.SSF.load_table(workbook.SSF);
    if (workbook.SSF) XLSX.SSF.load_table(workbook.SSF);
    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
            raw: false,
            header: 1
        });
        if (roa.length > 0) result[sheetName] = roa;
    });
    return result;
}

function process_wb(wb, sheetidx) {
    var sheet = wb.SheetNames[sheetidx || 0];
    json = to_json(wb)[sheet];
    var i = 0;
    var maxcol = 0;
    json.forEach(el => {
        if (maxcol < el.length) maxcol = el.length
    })
    json.forEach(el => {
        for (i = 0; i < maxcol; i++) {
            if (!el[i]) el[i] = ''
        }
    });
    add_grid(json);
}

function add_grid(json) {
    var grid = canvasDatagrid();
    var topaste = document.getElementById('excel');
    if (topaste.children.length > 0) {
        topaste.replaceChildren();
    }
    topaste.appendChild(grid);
    grid.formatters.date = function(e) {
            return new Date(e.cell.value).toLocaleDateString();
        },
        grid.attributes.filterOptionText = "Фильтр по <strong>%s</strong>",
        grid.attributes.clearSettingsOptionText = "Очистить сохраненные установки",
        grid.attributes.columnSelectorText = "Добавить/Удалить колонки",
        grid.attributes.copyText = "Копировать",
        grid.attributes.hideColumnText = "Скрыть <strong>%s</strong>",
        grid.attributes.pasteText = "Вставить",
        grid.attributes.removeFilterOptionText = "Удалить фильтр по <strong>%s</strong>",
        grid.attributes.showOrderByOptionTextAsc = "Сортировать <strong>%s</strong> по возрастанию",
        grid.attributes.showOrderByOptionTextDesc = "Сортировать <strong>%s</strong> по убыванию",
        grid.attributes.showNewRow = true
    grid.data = json;
}

function handleFile(e) {
    var files = e.target.files,
        f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var wb, arr;
        var wb = XLSX.read(data, {
            type: 'array'
        });
        process_wb(wb);
    };
    reader.readAsArrayBuffer(f);
}

var _file = document.getElementById('file');
_file.addEventListener('change', handleFile, false);

function isprXML(xmlfile) {
    var re = /({.*?})/sg;
    var re2 = /(<.*?>)/g;;
    let result = xmlfile.match(re) || [];
    let newres = [];
    result.forEach(element => {
        var newel = element.replace(re2, "");
        xmlfile = xmlfile.replace(element, newel);
    });
    return xmlfile;
}

function handleFilew(e) {
    var files = e.target.files,
        f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = new Uint8Array(e.target.result);
        var zip = new JSZip();
        var zip2 = new JSZip();
        //разархивировать
        zip.loadAsync(data)
            .then(function(zip) {
                // в архиве найти файл word/document.xml
                zip.file("word/document.xml").async("string").then(function(xmlfile) {
                    xmlfile = isprXML(xmlfile);
                    let maxk = json[0].length;
                    for (let i = 1; i < json.length; i++) {
                        let data = {};
                        for (let j = 0; j < maxk; j++) {
                            data[json[0][j]] = json[i][j];
                        }
                        let newxml = xmlfile;
                        for (key in data) {
                            newxml = newxml.replace("{" + key + "}", data[key]);
                        }
                        zip.file("word/document.xml", newxml);
                        var promise = null;
                        if (JSZip.support.uint8array) {
                            promise = zip.generateAsync({
                                type: "uint8array"
                            });
                        }
                        zip2.file("out" + i + ".docx", promise);
                    }
                    zip2.generateAsync({
                            type: "blob"
                        })
                        .then(function(blob) {
                            saveAs(blob, "out.zip");
                        });
                });
            });
    };
    reader.readAsArrayBuffer(f);
}

var _filew = document.getElementById('filew');
_filew.addEventListener('change', handleFilew, false);