﻿using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Data.Entity
{
    public interface IEntityWithDetails<TDetail>
    {
        IEnumerable<TDetail> Details { get; set; }
    }
}
