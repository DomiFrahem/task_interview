<?php

class Mask
{
    private $_regex = null;

    public function __construct($custom_regex)
    {
        $cr = new ConverterRegex($custom_regex);
        $this->_regex = $cr->get_regex();
    }

    public function equals($subject)
    {
        return preg_match($this->_regex, $subject);
    }

    public function many_equals($serial_number)
    {
        $matched = array();
        $no_matched = array();
        
        foreach ($serial_number as $number) {
            if ($this->equals($number)) {
                array_push($matched, $number);
            } else array_push($no_matched, $number);
        }

        return array($matched, $no_matched);
    }
}

class ConverterRegex
{
    private $map_custom_mask = array(
        "N" => "\\d",
        "A" => "[A-Z]",
        "a" => "[a-z]",
        "X" => "[A-Z|\\d]",
        "Z" => "[\\-|\\_|\\@]",
    );

    private $_regex = null;

    public function __construct($custom_regex)
    {
        $this->_regex = $this->convert_to_regex($custom_regex);
    }

    private function convert_to_regex($custom_regex)
    {
        $arr_str = str_split($custom_regex);
        $new_regex = "";

        foreach ($arr_str as $value) {
            if (isset($this->map_custom_mask[$value]))
                $new_regex .= $this->map_custom_mask[$value];
            else {
                trigger_error("Не корректная буква '{$value}' в маске {$custom_regex}", E_USER_ERROR);
                exit();
            }
        }

        return "/" . $new_regex . "/";
    }

    public function get_regex()
    {
        return $this->_regex;
    }
}
