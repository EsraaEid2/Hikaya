<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\UserProfileController;//esraa
use App\Http\Controllers\StoryController;
use App\Http\Controllers\LikeController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [RegisterController::class, 'register']);

Route::post('/login', [LoginController::class, 'login']);
// Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user-profile/{userId}', [UserProfileController::class, 'getUserProfile']);
    Route::get('/user-stories/{userId}', [UserProfileController::class, 'getUserStories']);
    Route::post('/stories/draft', [StoryController::class, 'saveDraft']);
    Route::post('/stories/{id}/publish', [StoryController::class, 'publishStory']);
    Route::get('/stories/{id}', [StoryController::class, 'show']); 
    Route::post('/logout', [LoginController::class, 'logout']);
    // Route::get('/stories', [StoryController::class, 'index']);
    // Route::get('/stories/magic-ideas', [StoryController::class, 'getMagicIdea']);
    // Route::post('/stories/magic-ideas', [StoryController::class, 'getMagicIdea']);
    // Route::post('/stories/{storyId}/toggle-like', [LikeController::class, 'toggleLike']);
    // Route::get('/user-profile/{id}', [UserProfileController::class, 'getUserProfile']);
    // Route::put('/edit-profile/{id}', [UserProfileController::class, 'updateUserProfile']);
});


//esraa
Route::get('/user-profile/{userId}', [UserProfileController::class, 'getUserProfile']);
Route::get('/user-stories/{userId}', [UserProfileController::class, 'getUserStories']);

Route::post('/stories/draft', [StoryController::class, 'saveDraft']);
Route::post('/stories/{id}/publish', [StoryController::class, 'publishStory']);
Route::get('/stories/magic-ideas', [StoryController::class, 'getMagicIdea']);

Route::get('/stories', [StoryController::class, 'index']);
Route::get('/stories/{id}', [StoryController::class, 'show']);
Route::post('/stories/magic-ideas', [StoryController::class, 'getMagicIdea']);
Route::post('/stories/{storyId}/toggle-like', [LikeController::class, 'toggleLike']);
Route::get('/user-profile/{id}', [UserProfileController::class, 'getUserProfile']);
Route::post('/edit-profile/{id}', [UserProfileController::class, 'updateUserProfile']);
Route::get('/user/{id}/stories', [UserProfileController::class, 'getUserStories']);
Route::delete('user/{userId}/stories/{storyId}', [UserProfileController::class, 'deleteStory']);
Route::get('user/{userId}/liked-stories', [UserProfileController::class, 'getLikedStories']);
Route::delete('user/{userId}/stories/{storyId}/remove-bookmark', [UserProfileController::class, 'removeBookmark']);