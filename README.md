# Bitbucket PR enforcements Chrome extension

> Disables the merge button if there are conflicts or the branch isn't up to date with the target 🔐

<img src="icon.png" style="max-width: 128px;" width="128" />

This Chrome extension disables the merge button if either of the following occurs:

- there are merge conflicts with the target branch
- the source branch is behind the target branch



## Installation

1. Download the source code by clicking the Download button at the top right
2. Open Chrome's Extension management page
3. Turn on Developer Mode at the top right if it isn't on already
4. Click "Load unpacked extension"
5. Find this directory and load it in. The root of the directory needs to have the `manifest.json` file


## Distribution

The following command bundles the Chrome extension and includes only the necessary files for distribution:

```sh
./bundle.sh
```


## Changelog

| Version | Changes           |
| :------ | :---------------- |
| 0.0.1   | Initial release 🚀 |
