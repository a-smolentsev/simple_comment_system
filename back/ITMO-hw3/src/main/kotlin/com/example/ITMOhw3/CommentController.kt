package com.example.ITMOhw3

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@CrossOrigin
@RestController
class CommentController {
    val ListComment= arrayListOf<CommentModel>()
    @GetMapping("/allComments")
    fun  getAll():MutableList<CommentModel>{
       return ListComment;
    }


    @PostMapping("/addComment")
    fun addComment(@RequestBody comment: CommentModel): ResponseEntity<Any> {
      ListComment.add(comment)

        return ResponseEntity(HttpStatus.ACCEPTED)
    }
}
