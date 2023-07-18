<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ProcessEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public string $value;
    public string $broadcastAs;

    public function __construct(String $broadcastAs, String $value)
    {
        $this->value = $value;
        $this->broadcastAs = $broadcastAs;
    }

    public function broadcastOn()
    {
        return new Channel('channel-process');
    }

    public function broadcastAs()
    {
        return 'process-'.$this->broadcastAs;
    }

    public function broadcastWith()
    {
        return [
            'response' => $this->value,
        ];
    }
}
