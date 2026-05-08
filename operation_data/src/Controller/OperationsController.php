<?php

namespace App\Controller;

use App\Service\OperationsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class OperationsController extends AbstractController
{

    public function __construct(
        private readonly OperationsService $operationsService
    )
    {}

    #[Route('/',methods: ['GET'])]
    public function index(): JsonResponse
    {
        $data = [
            'message' => 'Welcome to your new controller!',
        ];

        return $this->json($data);
    }

    #[Route('/sum', methods: ['POST'])]
    public function sum(Request $request): JsonResponse
    {

        $data = json_decode($request->getContent(), true);

        if (!is_array($data)) {
            return $this->json([
                "error" => "Invalid Json input"
            ], Response::HTTP_BAD_REQUEST);
        }

        if (
            !array_key_exists('a', $data) ||
            !array_key_exists('b', $data) ||
            !is_numeric($data['a']) ||
            !is_numeric($data['b'])
        ) {
            return $this->json([
                "error" => "Both 'a' and 'b' must be numeric"
            ], Response::HTTP_BAD_REQUEST);
        }

        $sum = $this->operationsService->sum($data['a'], $data['b']);

        return new JsonResponse([ "sum" => $sum], Response::HTTP_OK);

    }

}
