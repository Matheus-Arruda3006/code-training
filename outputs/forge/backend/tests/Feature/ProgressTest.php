<?php
namespace Tests\Feature;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class ProgressTest extends TestCase
{
    use RefreshDatabase;
    public function test_expanded_catalog_progress_and_unknown_project_rejection(): void
    {
        $token = $this->postJson('/api/register', ['name'=>'Dani','email'=>'dani@example.test','password'=>'long-test-password'])->assertCreated()->json('token');
        $projects = json_decode(file_get_contents(resource_path('project-ids.json')), true);
        $this->assertCount(424, $projects);
        $completed = [];
        foreach ($projects as $project)
            foreach (['0','1','2','challenge'] as $step) $completed[] = "$project:$step";
        $this->withToken($token)->putJson('/api/progress', ['completed'=>$completed])->assertOk();
        $this->withToken($token)->getJson('/api/progress')->assertExactJson(['completed'=>$completed]);
        $this->withToken($token)->putJson('/api/progress', ['completed'=>['python--invented:0']])->assertUnprocessable();
        $this->withToken($token)->putJson('/api/progress', ['completed'=>['python:0','python:0']])->assertUnprocessable();
        $this->withToken($token)->getJson('/api/progress')->assertExactJson(['completed'=>$completed]);
        $this->get('/api/catalog')->assertOk();
    }
    public function test_authentication_and_isolated_progress(): void
    {
        $this->getJson('/api/progress')->assertUnauthorized();
        $first = $this->postJson('/api/register', ['name'=>'Ana', 'email'=>'ana@example.test', 'password'=>'long-test-password'])->assertCreated()->json('token');
        $this->withToken($first)->putJson('/api/progress', ['completed'=>['python:0']])->assertOk();
        $this->withToken($first)->getJson('/api/progress')->assertJson(['completed'=>['python:0']]);
        $second = $this->postJson('/api/register', ['name'=>'Bia', 'email'=>'bia@example.test', 'password'=>'long-test-password'])->assertCreated()->json('token');
        $this->withToken($second)->getJson('/api/progress')->assertExactJson(['completed'=>[]]);
        $this->withToken($second)->putJson('/api/progress', ['completed'=>['invented:0']])->assertUnprocessable();
        $this->withToken($second)->postJson('/api/logout')->assertOk();
        $this->withToken($second)->getJson('/api/progress')->assertUnauthorized();
    }
    public function test_invalid_password_and_login_token_rotation(): void
    {
        $old = $this->postJson('/api/register', ['name'=>'Caio','email'=>'caio@example.test','password'=>'long-test-password'])->assertCreated()->json('token');
        $this->postJson('/api/login', ['email'=>'caio@example.test','password'=>'wrong-password'])->assertUnauthorized();
        $new = $this->postJson('/api/login', ['email'=>'caio@example.test','password'=>'long-test-password'])->assertOk()->json('token');
        $this->withToken($old)->getJson('/api/progress')->assertUnauthorized();
        $this->withToken($new)->getJson('/api/progress')->assertOk();
    }
}
