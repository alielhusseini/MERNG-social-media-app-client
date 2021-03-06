import React from 'react'
import { useGlobalAuthContext } from '../context/authContext'
import DeleteButton from './DeleteButton'
import { Card } from 'semantic-ui-react'
import moment from 'moment'

export default function Comments({comments, postId}) {
    const { user } = useGlobalAuthContext()

    return (
        comments.map((comment) => (
            <Card fluid key={comment.id}>
                <Card.Content>
                    {user && user.username === comment.username && (
                        <DeleteButton postId={postId} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
            </Card>
        ))
    )
}
