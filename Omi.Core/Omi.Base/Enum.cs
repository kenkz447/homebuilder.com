using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Base
{
    public enum EntityStatus
    {
        Private = 0,
        Public = 1,
        Protect = 2,
        Pending = 3,
        InTrash = 4
    }

    public enum FileType
    {
        Unknow,
        Image
    }
}
