<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
class LearningController
{
    public function catalog()
    {
        return response()->file(resource_path('catalog.json'), ['Content-Type' => 'application/json']);
    }
    public function progress(Request $request)
    {
        return response()->json(['completed' => $request->user()->completed ?? []]);
    }
    public function updateProgress(Request $request)
    {
        $ids = [];
        $projects = json_decode(file_get_contents(resource_path('project-ids.json')), true, 512, JSON_THROW_ON_ERROR);
        foreach ($projects as $track)
            foreach (['0','1','2','challenge'] as $step) $ids[] = "$track:$step";
        $data = $request->validate(['completed' => 'present|array|max:'.count($ids), 'completed.*' => ['string', 'distinct', Rule::in($ids)]]);
        $request->user()->forceFill(['completed' => array_values($data['completed'])])->save();
        return response()->json($data);
    }
}
