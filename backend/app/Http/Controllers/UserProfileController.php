<?php

// UserProfileController.php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Models\Like;
use App\Models\Story;

class UserProfileController extends Controller
{
    public function getUserProfile($id)
    {
        // Find the user by ID
        $user = User::find($id);
        // Check if user exists
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Return user data as JSON
        return response()->json([
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'bio' => $user->bio,
            'profile_picture' => $user->profile_picture,
        ]);
    }
    public function updateUserProfile(Request $request, $id)
    {
        $user = User::find($id);
    
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
    
        // Validate the input data
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'bio' => 'nullable|string|max:1000',
            // No need to validate profile_picture if it's not always required
        ]);
    
        // Update user data (this happens regardless of profile picture)
        $user->first_name = $validated['first_name'];
        $user->last_name = $validated['last_name'];
        $user->bio = $validated['bio']; // Update the bio
        $old_image='';
        // Handle profile picture upload (if any)
        if ($request->hasFile('profile_picture')) {
            $validatedImage = $request->validate([
                'profile_picture' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);
   
            $imageName = now()->format('Y-m-d_H-i-s') . '.' . $request->file('profile_picture')->getClientOriginalExtension();
            $imagePath = 'http://127.0.0.1:8000/images/' . $imageName;
            $request->file('profile_picture')->move(public_path('images'), $imageName);
            
            $user->profile_picture=$imagePath;
            $user->save();
            return response()->json(['message' => $imagePath]);
         }
         $old_image=$user->profile_picture;
        // Save the user with the updated fields
        $user->save();
    
        return response()->json(['message' => $old_image]);
    }

    public function getUserStories($id)
    {
        
        $user = User::find($id);

        
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        
        $stories = $user->stories;

        
        return response()->json($stories);
    }
    public function deleteStory($userId, $storyId)
    {
        // Find the story by its ID and make sure it's associated with the correct user
        $story = Story::where('user_id', $userId)->where('story_id', $storyId)->first();

        if ($story) {
            // Delete the story from the database
            $story->delete();

            return response()->json(['message' => 'Story deleted successfully.']);
        }

        return response()->json(['message' => 'Story not found or you are not authorized to delete it.'], 404);
    }
    
    public function getLikedStories($userId)
    {
        // Get all likes for the specific user
        $likes = Like::where('user_id', $userId)->get();

        // Extract the story_ids from the likes
        $storyIds = $likes->pluck('story_id');

        // Get the stories that the user has liked
        $stories = Story::whereIn('story_id', $storyIds)->get();

        // Return the stories (you can return as JSON or pass to a view)
        return response()->json($stories);
    }

    public function removeBookmark($userId, $storyId)
    {
        // Find and delete the like record
        $like = Like::where('user_id', $userId)->where('story_id', $storyId)->first();

        if ($like) {
            $like->delete();

            return response()->json(['message' => 'Bookmark removed successfully.']);
        }

        return response()->json(['message' => 'Bookmark not found.'], 404);
    }
}