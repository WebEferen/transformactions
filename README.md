# Transformactions Module

## Overview

Transformactions module allows to easily manage the numeric files such as calculations sheets. It can easily parse, read and transform from any sheet to another one with some parsing like intelligent headers finding.

## Getting Started

To install module, simply type:

```javascript
npm install transformactions
```

That command will install that module. After that just require that module.

```javascript
const transformactions = require('transformactions');
```

Or like the ES6 style:

```javascript
import { parser, converter } from 'transformactions';
```

For now there are two available modules.

* parser **(for parsing existing documents)**
* converter **(for convert numbers into new types)**

## Parser

There are several functions to parse different types of files
* XLS
* XLSX
* TXT (PLAIN)
* CSV

For any of that files there is one function to parse it:

> **XLS Parser**

```javascript
transformations.parseXls('path', config);
```

> **XLSX Parser**

```javascript
transformations.parseXls('path', config);
```

> **CSV Parser**

```javascript
transformations.parseXls('path', config);
```

> **PLAIN Parser**

```javascript
transformations.parsePlain('path', config);
```

### Config object

```javascript
const config = {
  input: {
    delimiter: ';',             // Delimiter (default ';')
    newLineDelimiter: '\r\n',   // New Line Delimiter (default: '\n')
    headerLine: null,           // Header line number (default: 0)
    contentStartsAt: 1,         // Content starts line number (default: 1)
    excludedLines: [],          // Lines to exclude (default: [])
    sheetName: null             // Sheet name (if type = xls or xlsx)
  },
  headerKeys: false,            // If true then use headers as column keys
  autoHeaders: false            // Smart header search
};
```

> **autoHeaders** - if true then headerLine can be undefined