<?php

namespace App\Service;

use App\Repository\OperationsRepository;

class OperationsService
{

    public function __construct
    (
        private readonly OperationsRepository $operationsRepository
    ){}

    public function sum(int | float | string $a, int | float | string $b): float
    {
        return $this->operationsRepository->sum((float)$a, (float)$b);
    }
}
