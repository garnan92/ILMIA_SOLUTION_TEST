<?php

namespace App\Repository;

class OperationsRepository
{
    public function sum(float $a, float $b): float
    {
        return $a + $b;
    }
}
