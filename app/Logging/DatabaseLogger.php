<?php

namespace App\Logging;

use Monolog\Logger;

class DatabaseLogger
{
    /**
     * Create a custom Monolog instance.
     */
    public function __invoke(array $config): Logger
    {
        $logger = new Logger("DatabaseHandler");
        return $logger->pushHandler(new DatabaseHandler());
    }
}
