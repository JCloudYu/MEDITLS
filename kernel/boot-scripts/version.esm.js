/**
 *	Author: JCloudYu
 *	Create: 2020/01/30
**/
import {KernelInfo, ProjectInfo, KernelArchVersion} from "/kernel-info.esm.js";

const {version:runtime_version} = KernelInfo;
const {name:project_name, version:project_version} = ProjectInfo;
process.stdout.write(`${runtime_version||"0.0.0"}, ${project_version}(${project_name}), ${KernelArchVersion}\n`);
