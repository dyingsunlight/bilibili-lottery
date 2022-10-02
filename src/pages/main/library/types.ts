export interface Comment {
  "page": {
    "num": number
    "size": number
    "count": number
    "acount": number
  },
  "config": {
    "showtopic": number
    "show_up_flag": boolean,
    "read_only": boolean
  },
  "replies":  {
    "rpid": number
    "oid": number
    "type": number
    "mid": number
    "root": number
    "parent": number
    "dialog": number
    "count": number
    "rcount": number
    "state": number
    "fansgrade": number
    "attr": number
    "ctime": number
    "rpid_str": string
    "root_str": string
    "parent_str": string
    "like": number
    "action": number
    "member": {
      "mid": string
      "uname": string
      "sex": string
      "sign": string
      "avatar": string
      "rank": string
      "DisplayRank": string
      "face_nft_new": number
      "is_senior_member": number
      "level_info": {
        "current_level": number
        "current_min": number
        "current_exp": number
        "next_exp": number
      },
      "pendant": {
        "pid": number
        "name": string
        "image": string
        "expire": number
        "image_enhance": string
        "image_enhance_frame": string
      },
      "nameplate": {
        "nid": number
        "name": string
        "image": string
        "image_small": string
        "level": string
        "condition": string
      },
      "official_verify": {
        "type": number
        "desc": string
      },
      "vip": {
        "vipType": number
        "vipDueDate": number
        "dueRemark": string
        "accessStatus": number
        "vipStatus": number
        "vipStatusWarn": string
        "themeType": number
        "label": {
          "path": string
          "text": string
          "label_theme": string
          "text_color": string
          "bg_style": number
          "bg_color": string
          "border_color": string
          "use_img_label": boolean,
          "img_label_uri_hans": string
          "img_label_uri_hant": string
          "img_label_uri_hans_static": string
          "img_label_uri_hant_static": string
        },
        "avatar_subscript": number
        "nickname_color": string
      },
      "fans_detail": {
        "uid": number
        "medal_id": number
        "medal_name": string
        "score": number
        "level": number
        "intimacy": number
        "master_status": number
        "is_receive": number
        "medal_color": number
        "medal_color_end": number
        "medal_color_border": number
        "medal_color_name": number
        "medal_color_level": number
        "guard_level": number
        "guard_icon": string
        "honor_icon": string
        "medal_level_bg_color": number
      },
      "following": number
      "is_followed": number
      "user_sailing": {
        "pendant": null,
        "cardbg": {
          "id": number
          "name": string
          "image": string
          "jump_url": string
          "fan": {
            "is_fan": number
            "number": number
            "color": string
            "name": string
            "num_desc": string
          },
          "type": string
        },
        "cardbg_with_focus": null
      },
      "is_contractor": boolean,
      "contract_desc": string
      "nft_interaction": null
    },
    "content": {
      "message": string
      "plat": number
      "device": string
      "members": [],
      "jump_url": {},
      "max_line": number
      "rich_text": null
    },
    "replies": null,
    "assist": number
    "folder": {
      "has_folded": boolean,
      "is_folded": boolean,
      "rule": string
    },
    "up_action": {
      "like": boolean,
      "reply": boolean
    },
    "show_follow": boolean,
    "invisible": boolean,
    "reply_control": {
      "time_desc": string
    }
  }[]
  "upper": {
    "mid": number
    "top": {
      "rpid": number
      "oid": number
      "type": number
      "mid": number
      "root": number
      "parent": number
      "dialog": number
      "count": number
      "rcount": number
      "state": number
      "fansgrade": number
      "attr": number
      "ctime": number
      "rpid_str": string
      "root_str": string
      "parent_str": string
      "like": number
      "action": number
      "member": {
        "mid": string
        "uname": string
        "sex": string
        "sign": string
        "avatar": string
        "rank": string
        "DisplayRank": string
        "face_nft_new": number
        "is_senior_member": number
        "level_info": {
          "current_level": number
          "current_min": number
          "current_exp": number
          "next_exp": number
        },
        "pendant": {
          "pid": number
          "name": string
          "image": string
          "expire": number
          "image_enhance": string
          "image_enhance_frame": string
        },
        "nameplate": {
          "nid": number
          "name": string
          "image": string
          "image_small": string
          "level": string
          "condition": string
        },
        "official_verify": {
          "type": number
          "desc": string
        },
        "vip": {
          "vipType": number
          "vipDueDate": number
          "dueRemark": string
          "accessStatus": number
          "vipStatus": number
          "vipStatusWarn": string
          "themeType": number
          "label": {
            "path": string
            "text": string
            "label_theme": string
            "text_color": string
            "bg_style": number
            "bg_color": string
            "border_color": string
            "use_img_label": boolean,
            "img_label_uri_hans": string
            "img_label_uri_hant": string
            "img_label_uri_hans_static": string
            "img_label_uri_hant_static": string
          },
          "avatar_subscript": number
          "nickname_color": string
        },
        "fans_detail": {
          "uid": number
          "medal_id": number
          "medal_name": string
          "score": number
          "level": number
          "intimacy": number
          "master_status": number
          "is_receive": number
          "medal_color": number
          "medal_color_end": number
          "medal_color_border": number
          "medal_color_name": number
          "medal_color_level": number
          "guard_level": number
          "guard_icon": string
          "honor_icon": string
          "medal_level_bg_color": number
        },
        "following": number
        "is_followed": number
        "user_sailing": {
          "pendant": {
            "id": number
            "name": string
            "image": string
            "jump_url": string
            "type": string
            "image_enhance": string
            "image_enhance_frame": string
          },
          "cardbg": {
            "id": number
            "name": string
            "image": string
            "jump_url": string
            "fan": {
              "is_fan": number
              "number": number
              "color": string
              "name": string
              "num_desc": string
            },
            "type": string
          },
          "cardbg_with_focus": null
        },
        "is_contractor": boolean,
        "contract_desc": string
        "nft_interaction": null
      },
      "content": {
        "message": string
        "plat": number
        "device": string
        "members": [],
        "jump_url": {},
        "max_line": number
        "rich_text": null
      },
      "replies":   {
        "rpid": number
        "oid": number
        "type": number
        "mid": number
        "root": number
        "parent": number
        "dialog": number
        "count": number
        "rcount": number
        "state": number
        "fansgrade": number
        "attr": number
        "ctime": number
        "rpid_str": string
        "root_str": string
        "parent_str": string
        "like": number
        "action": number
        "member": {
          "mid": string
          "uname": string
          "sex": string
          "sign": string
          "avatar": string
          "rank": string
          "DisplayRank": string
          "face_nft_new": number
          "is_senior_member": number
          "level_info": {
            "current_level": number
            "current_min": number
            "current_exp": number
            "next_exp": number
          },
          "pendant": {
            "pid": number
            "name": string
            "image": string
            "expire": number
            "image_enhance": string
            "image_enhance_frame": string
          },
          "nameplate": {
            "nid": number
            "name": string
            "image": string
            "image_small": string
            "level": string
            "condition": string
          },
          "official_verify": {
            "type": number
            "desc": string
          },
          "vip": {
            "vipType": number
            "vipDueDate": number
            "dueRemark": string
            "accessStatus": number
            "vipStatus": number
            "vipStatusWarn": string
            "themeType": number
            "label": {
              "path": string
              "text": string
              "label_theme": string
              "text_color": string
              "bg_style": number
              "bg_color": string
              "border_color": string
              "use_img_label": boolean,
              "img_label_uri_hans": string
              "img_label_uri_hant": string
              "img_label_uri_hans_static": string
              "img_label_uri_hant_static": string
            },
            "avatar_subscript": number
            "nickname_color": string
          },
          "fans_detail": {
            "uid": number
            "medal_id": number
            "medal_name": string
            "score": number
            "level": number
            "intimacy": number
            "master_status": number
            "is_receive": number
            "medal_color": number
            "medal_color_end": number
            "medal_color_border": number
            "medal_color_name": number
            "medal_color_level": number
            "guard_level": number
            "guard_icon": string
            "honor_icon": string
            "medal_level_bg_color": number
          },
          "following": number
          "is_followed": number
          "user_sailing": {
            "pendant": {
              "id": number
              "name": string
              "image": string
              "jump_url": string
              "type": string
              "image_enhance": string
              "image_enhance_frame": string
            },
            "cardbg": {
              "id": number
              "name": string
              "image": string
              "jump_url": string
              "fan": {
                "is_fan": number
                "number": number
                "color": string
                "name": string
                "num_desc": string
              },
              "type": string
            },
            "cardbg_with_focus": null
          },
          "is_contractor": boolean,
          "contract_desc": string
          "nft_interaction": null
        },
        "content": any,
        "replies": null,
        "assist": number
        "folder": {
          "has_folded": boolean,
          "is_folded": boolean,
          "rule": string
        },
        "up_action": {
          "like": boolean,
          "reply": boolean
        },
        "show_follow": boolean,
        "invisible": boolean,
        "reply_control": {
          "time_desc": string
        }
      }[],
      "assist": number
      "folder": {
        "has_folded": boolean,
        "is_folded": boolean,
        "rule": string
      },
      "up_action": {
        "like": boolean,
        "reply": boolean
      },
      "show_follow": boolean,
      "invisible": boolean,
      "reply_control": {
        "sub_reply_entry_text": string
        "sub_reply_title_text": string
        "time_desc": string
      }
    },
    "vote": null
  },
  "top": null,
  "notice": null,
  "vote": number
  "blacklist": number
  "assist": number
  "mode": number
  "support_mode": number[],
  "folder": {
    "has_folded": boolean,
    "is_folded": boolean,
    "rule": string
  },
  "show_bvid": boolean,
  "control": {
    "input_disable": boolean,
    "root_input_text": string
    "child_input_text": string
    "giveup_input_text": string
    "answer_guide_text": string
    "answer_guide_icon_url": string
    "answer_guide_ios_url": string
    "answer_guide_android_url": string
    "bg_text": string
    "show_type": number
    "show_text": string
    "web_selection": boolean,
    "disable_jump_emote": boolean
  }
}

export interface DynamicMetadata{
  "item": {
    "basic": {
      "comment_id_str": string,
      "comment_type": number,
      "like_icon": {
        "action_url": string,
        "end_url":string,
        "id": number,
        "start_url": string
      },
      "rid_str": string
    },
    "id_str": string,
    "modules": {
      "module_author": {
        "face": string,
        "face_nft": boolean,
        "following": null,
        "jump_url": string,
        "label": string,
        "mid": number,
        "name": string,
        "official_verify": {
          "desc": string,
          "type": number
        },
        "pendant": {
          "expire": number,
          "image": string,
          "image_enhance": string,
          "image_enhance_frame": string,
          "name": string,
          "pid": number
        },
        "pub_action": string,
        "pub_location_text": string,
        "pub_time": string,
        "pub_ts": number,
        "type": string,
        "vip": {
          "avatar_subscript": number,
          "avatar_subscript_url": string,
          "due_date": number,
          "label": {
            "bg_color": string,
            "bg_style": number,
            "border_color": string,
            "img_label_uri_hans": string,
            "img_label_uri_hans_static": string,
            "img_label_uri_hant": string,
            "img_label_uri_hant_static": string,
            "label_theme": string,
            "path": string,
            "text": string,
            "text_color": string,
            "use_img_label": boolean
          },
          "nickname_color": string,
          "status": number,
          "theme_type": number,
          "type": number
        }
      },
      "module_dynamic": {
        "additional": null,
        "desc": {
          "rich_text_nodes": [
            {
              "orig_text": string,
              "text": string,
              "type": string
            },
            {
              "jump_url": string,
              "orig_text": string,
              "text": string,
              "type": string
            },
            {
              "orig_text": string,
              "text": string,
              "type": string
            },
            {
              "jump_url": string,
              "orig_text": string,
              "text": string,
              "type": string
            },
            {
              "orig_text": string,
              "text": string,
              "type": string
            },
            {
              "jump_url": string,
              "orig_text": string,
              "text": string,
              "type": string
            },
            {
              "orig_text": string,
              "text": string,
              "type": string
            }
          ],
          "text": string
        },
        "major": {
          "draw": {
            "id": number,
            "items": {
              "height": number,
              "size": number,
              "src": string,
              "tags": string[],
              "width": number
            }[]
          },
          "type": string
        },
        "topic": null
      },
      "module_more": {
        "three_point_items": {
          "label": string,
          "type": string
        }[]
      },
      "module_stat": {
        "comment": {
          "count": number,
          "forbidden": boolean
        },
        "forward": {
          "count": number,
          "forbidden": boolean
        },
        "like": {
          "count": number,
          "forbidden": boolean,
          "status": boolean
        }
      }
    },
    "type": string,
    "visible": boolean
  }
}

export interface VideoMetadata {
  "bvid": string
  "aid": number
  "videos": number
  "tid": number
  "tname": string
  "copyright": number
  "pic": string
  "title": string
  "pubdate": number
  "ctime": number
  "desc": string
  "desc_v2": {
    "raw_text": string
    "type": number
    "biz_id": number
  }[]
  "state": number
  "duration": number
  "rights": {
    "bp": number
    "elec": number
    "download": number
    "movie": number
    "pay": number
    "hd5": number
    "no_reprint": number
    "autoplay": number
    "ugc_pay": number
    "is_cooperation": number
    "ugc_pay_preview": number
    "no_background": number
    "clean_mode": number
    "is_stein_gate": number
    "is_360": number
    "no_share": number
    "arc_pay": number
    "free_watch": number
  },
  "owner": {
    "mid": number
    "name": string
    "face": string
  },
  "stat": {
    "aid": number
    "view": number
    "danmaku": number
    "reply": number
    "favorite": number
    "coin": number
    "share": number
    "now_rank": number
    "his_rank": number
    "like": number
    "dislike": number
    "evaluation": "",
    "argue_msg": ""
  },
  "dynamic": string
  "cid": number
  "dimension": {
    "width": number
    "height": number
    "rotate": number
  },
  "premiere": null,
  "teenage_mode": number
  "is_chargeable_season": boolean,
  "is_story": boolean,
  "no_cache": boolean,
  "pages": [
    {
      "cid": number
      "page": number
      "from": string
      "part": string
      "duration": number
      "vid": "",
      "weblink": "",
      "dimension": {
        "width": number
        "height": number
        "rotate": number
      },
      "first_frame": string
    }
  ],
  "subtitle": {
    "allow_submit": boolean,
    "list": {
      "id": number
      "lan": string
      "lan_doc": string
      "is_lock": boolean,
      "author_mid": number
      "subtitle_url": string
      "type": number
      "id_str": string
      "ai_type": number
      "ai_status": number
      "author": {
        "mid": number
        "name": string
        "sex": string
        "face": string
        "sign": string
        "rank": number
        "birthday": number
        "is_fake_account": number
        "is_deleted": number
        "in_reg_audit": number
        "is_senior_member": number
      }
    }[]
  },
  "is_season_display": boolean,
  "user_garb": {
    "url_image_ani_cut": ""
  },
  "honor_reply": {
    "honor": {
      "aid": number
      "type": number
      "desc": string
      "weekly_recommend_num": number
    }[]
  },
  "like_icon": ""
}

export interface UserProfile {
  "isLogin": boolean,
  "email_verified": number
  "face": string
  "face_nft": number
  "face_nft_type": number
  "level_info": {
    "current_level": number
    "current_min": number
    "current_exp": number
    "next_exp": string
  },
  "mid": number
  "mobile_verified": number
  "money": number
  "moral": number
  "official": {
    "role": number
    "title": string
    "desc": string
    "type": number
  },
  "officialVerify": {
    "type": number,
    "desc": string
  },
  "pendant": {
    "pid": number
    "name": string
    "image": string
    "expire": number
    "image_enhance": string
    "image_enhance_frame": string
  },
  "scores": number
  "uname": string
  "vipDueDate": number
  "vipStatus": number
  "vipType": number
  "vip_pay_type": number
  "vip_theme_type": number
  "vip_label": {
    "path": string
    "text": string
    "label_theme": string
    "text_color": string
    "bg_style": number
    "bg_color": string
    "border_color": string
    "use_img_label": boolean,
    "img_label_uri_hans": string
    "img_label_uri_hant": string
    "img_label_uri_hans_static": string
    "img_label_uri_hant_static": string
  },
  "vip_avatar_subscript": number
  "vip_nickname_color": string
  "vip": {
    "type": number
    "status": number
    "due_date": number
    "vip_pay_type": number
    "theme_type": number
    "label": {
      "path": string
      "text": string
      "label_theme": string
      "text_color": string
      "bg_style": number
      "bg_color": string
      "border_color": string
      "use_img_label": boolean,
      "img_label_uri_hans": string
      "img_label_uri_hant": string
      "img_label_uri_hans_static": string
      "img_label_uri_hant_static": string
    },
    "avatar_subscript": number
    "nickname_color": string
    "role": number
    "avatar_subscript_url": string
    "tv_vip_status": number
    "tv_vip_pay_type": number
  },
  "wallet": {
    "mid": number
    "bcoin_balance": number
    "coupon_balance": number
    "coupon_due_time": number
  },
  "has_shop": boolean,
  "shop_url": string
  "allowance_count": number
  "answer_status": number
  "is_senior_member": number
}

