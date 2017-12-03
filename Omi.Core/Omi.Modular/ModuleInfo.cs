using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;

namespace Omi.Modular
{
    public class ModuleInfo
    {
        public string ModuleName { get; set; }
        public Assembly Assembly { get; set; }
        public int LoadOrder { get; set; }
    }
}
